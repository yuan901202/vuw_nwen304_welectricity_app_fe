
angular.module('welc.controllers', [])
    .controller('TitlePageCtrl', ['$scope', 'AuthService', '$state', function ($scope, AuthService, $state) {
        if(!AuthService.loggedIn()) {
            $state.go('Login');
        }
    }]);
