/**
 * Created by Tony
 */

angular.module('welc.controllers')
    .controller('CityViewCtrl', ['$scope', 'GameService', function ($scope, GameService) {
        $scope.plants = GameService.getPlants();
    }]);
