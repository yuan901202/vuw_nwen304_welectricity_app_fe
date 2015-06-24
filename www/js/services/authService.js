/**
 * Created by John on 24/06/2015.
 */
angular.module('welc.services')
    .service('AuthService', ['$window', '$http', function ($window, $http) {

        /**
         * Check if a user is authenticated
         * @returns {boolean}
         */
        this.loggedIn = function() {
            return false;
        };

        /**
         * Register a new user
         *
         * @param email
         * @param username
         * @param password
         */
        this.register = function(email, username, password) {
            //Login
            return $http.post('https://server/user/create').then(function(response) {
                //Store the access token so that the user does not have to log in every time the app starts
                $window.localStorage['Token'] = response.data;
                return 'Success';
            }, function() {
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
        this.login = function(username, password) {
            //Login
            return $http.post('https://server/login').then(function(response) {
                //Store the access token so that the user does not have to log in every time the app starts
                $window.localStorage['Token'] = response.data;
                return 'Success';
            }, function() {
                return 'Failed';
            });
        };

        /**
         * Log user out
         */
        this.logout = function() {
            $window.localStorage['Token'] = ''; //Just clear our token
        };
    }]);