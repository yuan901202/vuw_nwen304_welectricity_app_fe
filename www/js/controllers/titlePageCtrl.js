
angular.module('welc.controllers', [])
    .controller('TitlePageCtrl', ['$scope', 'AuthService', '$state', '$timeout', '$ionicLoading', function ($scope, AuthService, $state, $timeout, $ionicLoading) {
        $ionicLoading.hide();
        if(!AuthService.loggedIn()) {
            $state.go('Login');
        }
    }]);
