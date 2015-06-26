/**
 * Created by John on 24/06/2015.
 */
angular.module('welc.controllers')
    .controller('LoginCtrl', ['$scope', 'AuthService', '$ionicLoading', '$ionicPopup', '$state', 'saveLoadService', 'GameService', '$timeout',
        function ($scope, AuthService, $ionicLoading, $ionicPopup, $state, saveLoadService, GameService, $timeout) {
            $ionicLoading.hide();

            $scope.login = function (username, password) {
                $ionicLoading.show({
                    template: 'Loading.....'
                });

                AuthService.login(username, password).then(function () {
                    $timeout(function() {
                        $ionicLoading.hide();
                    }, 100);
                    $state.go('titlePage');

                    saveLoadService.loadGame().then(function (game) {
                        GameService.loadGame(game.data);
                    }, function () {
                        console.log("Could not load game");
                    });
                }, function () {
                    $timeout(function() {
                        $ionicLoading.hide();
                    }, 100);

                    $ionicPopup.alert({
                        title: 'Error',
                        template: 'Whoops something went wrong. Check your details and try again later'
                    });
                });
            };
        }]);