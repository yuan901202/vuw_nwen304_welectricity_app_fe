/**
 * Created by John on 13/06/2015.
 */
angular.module('welc.controllers')
    .controller('NavCtrl', ['$scope', 'AuthService', '$state', '$rootScope', '$ionicPopup', '$state', function ($scope, AuthService, $state, $rootScope, $ionicPopup) {
        $scope.loggedIn = AuthService.loggedIn();

        $rootScope.$on('$stateChangeSuccess', function () {
            $scope.loggedIn = AuthService.loggedIn();
        });

        $scope.logOut = function () {
            AuthService.logout();
            $state.go('Login');
        };

        $scope.deleteUser = function () {
            $ionicPopup.confirm({
                title: "Delete User",
                template: "Are you sure you want to delete all your data? (This includes all game data)"
            }).then(function () {
                AuthService.deleteUser().then(function () {
                    AuthService.logout();
                    $state.go('Login');
                });
            });
        };
    }]);
