/**
 * Created by John on 13/06/2015.
 */
angular.module('welc.controllers')
    .controller('NavCtrl', ['$scope', 'AuthService', function ($scope, AuthService) {
        $scope.loggedIn = AuthService.loggedIn();
    }]);
