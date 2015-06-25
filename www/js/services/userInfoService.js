/**
 * Created by John on 13/06/2015.
 */
angular.module('welc.services')
    .service('userInfoService', ['$http', function ($http) {
        var username,
            userId = 1,//TODO: This is 1 until loading user info from the backend is complete
            host = '';

        /**
         * Get the users username
         * @returns {*} users username
         */
        this.getUserName = function () {
            if (!angular.isDefined(username)) {
                //TODO: Load from the server
            } else {
                return userName;
            }
        };

        /**
         * Get the users user id.
         * @returns {*} users userId
         */
        this.getUserId = function () {
            if (!angular.isDefined(username)) {
                //TODO: Load from the server
                return userId;
            } else {
                return userId;
            }
        };

        /**
         * Change the users username
         * @param userName - The new user name to set
         */
        this.setUserName = function (userName) {
            $http.put(host, userName).then(function () {
                //Updated ok
            }, function () {
                //Some error
            });
        };

        /**
         * Change the users username
         * @param userName - The new user name to set
         */
        this.setUserId = function (newUserId) {
            userId = newUserId;
        };
    }])
;