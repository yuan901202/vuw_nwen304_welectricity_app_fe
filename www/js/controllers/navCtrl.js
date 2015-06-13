/**
 * Created by John on 13/06/2015.
 */
angular.module('welc.controllers')
    .controller('NavCtrl', ['$scope', 'saveLoadService', 'GameService', function ($scope, saveLoadService, GameService) {

        $scope.saveGame = function() {
            saveLoadService.saveGame(GameService.getGame());
        }
    }]);
