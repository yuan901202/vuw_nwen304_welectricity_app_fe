/**
 * Created by John on 24/06/2015.
 */
angular.module('welc.services')
    .service('AuthService', ['$window', '$http', '$q', '$timeout', 'userInfoService', function ($window, $http, $q, $timeout, userInfoService) {
        var host = 'https://guarded-earth-8421.herokuapp.com';

        /**
         * Check if a user is authenticated
         * @returns {boolean}
         */
        this.loggedIn = function () {
            return ($window.localStorage['Token'] !== '');
        };

        /**
         * Register a new user
         *
         * @param email
         * @param username
         * @param password
         */
        this.register = function (email, username, password) {
            var postData = {email: email, user_name: username, password: password};

            return $http.post(host + '/user/create', postData).success(function (response) {
                //Store the access token so that the user does not have to log in every time the app starts
                $window.localStorage['Token'] = response.data.token;
                userInfoService.setUserId(response.data.userId);
                return 'Success';
            }).error(function () {
                return 'Failed';
            });
        };

        /**
         * Login in a user.
         *
         * @param username
         * @param password
         * @returns {*}
         */
        this.login = function (username, password) {
            //Special case that application is being demoed
            if (username === 'demo' && password === 'demo') {
                $window.localStorage['Token'] = 'demo token';
                var defer = $q.defer();
                $timeout(function () {
                    defer.resolve('Success');
                }, 500);
                return defer.promise;
            }

            //Login
            return $http.post('https://server/login').success(function (response) {
                //Store the access token so that the user does not have to log in every time the app starts
                $window.localStorage['Token'] = response.data;
                return 'Success';
            }).error(function () {
                return 'Failed';
            });
        };

        this.deleteUser = function () {
            return $http.delete(host + '/user/' + userInfoService.getUserId()).then(function (response) {
                //Store the access token so that the user does not have to log in every time the app starts
                $window.localStorage['Token'] = '';
                return 'Success';
            }, function () {
                return 'Failed';
            });
        };

        /**
         * Log user out
         */
        this.logout = function () {
            $window.localStorage['Token'] = ''; //Just clear our token
        };
    }]);