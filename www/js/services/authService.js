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
            if(!$window.localStorage['Token'] || $window.localStorage['Token'] === '') {
                return false;
            } else {
                var loginObj = JSON.parse($window.localStorage['Token']);
                return !!loginObj.loggedIn;
            }
        };

        /**
         * Register a new user
         *
         * @param userEmail
         * @param userName
         * @param userPassword
         */
        this.register = function (userEmail, userName, userPassword) {
            var postData = {email: userEmail, username: userName, password: userPassword};

            return $http.post(host + '/user/create', postData).success(function (response) {
                //Store the access token so that the user does not have to log in every time the app starts
                $window.localStorage['Token'] = JSON.stringify({loggedIn: true, token: response.token});;
                userInfoService.setUserId(response.userId);
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
                $window.localStorage['Token'] = JSON.stringify({loggedIn: true, token: 'demo token'});
                var defer = $q.defer();
                $timeout(function () {
                    defer.resolve('Success');
                }, 500);
                return defer.promise;
            }

            //Login
            return $http.post(host + '/login', {userId: userInfoService.getUserId(), username: username, password: password}).success(function (response) {
                //Store the access token so that the user does not have to log in every time the app starts
                $window.localStorage['Token'] = JSON.stringify({loggedIn: true, token: response.data});
                return 'Success';
            }).error(function () {
                return 'Failed';
            });
        };

        this.deleteUser = function () {
            return $http.delete(host + '/user/' + userInfoService.getUserId()).success(function (response) {
                //Store the access token so that the user does not have to log in every time the app starts
                $window.localStorage['Token'] = '';
                return 'Success';
            }).error(function () {
                return 'Failed';
            });
        };

        this.getToken = function() {
            return $window.localStorage['Token'];
        };

        /**
         * Log user out
         */
        this.logout = function () {
            $window.localStorage['Token'] = ''; //Just clear our token
        };
    }]);