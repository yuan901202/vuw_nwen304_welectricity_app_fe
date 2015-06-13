/**
 * Created by John on 13/06/2015.
 */
angular.module('welc.controllers')
    .controller('NavCtrl', ['$scope', 'saveLoadService', 'GameService', '$ionicPopup', function ($scope, saveLoadService, GameService, $ionicPopup) {

        $scope.saveGame = function() {
            saveLoadService.saveGame(GameService.getGame()).then(function() {
                $ionicPopup.alert({
                    title: 'Success',
                    template: 'Game was saved successfully'
                })
            }, function () {
                $ionicPopup.alert({
                    title: 'Fail',
                    template: 'Game did not save successfully. Make sure you are connected to the internet'
                })
            });
        }
    }]);
