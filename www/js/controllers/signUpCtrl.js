/**
 * Created by John on 24/06/2015.
 */
angular.module('welc.controllers')
    .controller('SignUpCtrl', ['$scope', 'AuthService', '$ionicPopup', '$state', '$ionicLoading', 'saveLoadService', 'GameService', '$timeout',
        function ($scope, AuthService, $ionicPopup, $state, $ionicLoading, saveLoadService, GameService, $timeout) {
            $scope.signUp = function (email, username, password) {
                $ionicLoading.show({
                    template: 'Loading.....'
                });

                AuthService.register(email, username, password).then(function () {
                    $state.go('titlePage');
                    $timeout(function () {
                        $ionicLoading.hide();
                    }, 100);
                    saveLoadService.loadGame().then(function (game) {
                        GameService.loadGame(game);
                    }, function () {
                        console.log("Could not load game");
                    });
                }, function () {
                    $timeout(function () {
                        $ionicLoading.hide();
                    }, 100);
                    $ionicPopup.alert({
                        title: 'Error',
                        template: 'Whoops something went wrong. Please try again later'
                    });
                });
            };
        }]);