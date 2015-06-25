/**
 * Created by John on 13/06/2015.
 */
angular.module('welc.controllers')
    .controller('NavCtrl', ['$scope', 'AuthService', '$state', '$rootScope', function ($scope, AuthService, $state, $rootScope) {
        $scope.loggedIn = AuthService.loggedIn();

        $rootScope.$on('$stateChangeSuccess', function() {
            $scope.loggedIn = AuthService.loggedIn();
        });

        $scope.logOut = function() {
            AuthService.logout();
            $state.go('Login');
        }
    }]);
