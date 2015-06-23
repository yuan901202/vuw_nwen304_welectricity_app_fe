/**
 * Created by John on 10/05/2015.
 */
angular.module('welc.controllers')
    .controller('GamePlayCtrl', ['$scope', 'GameService', 'autoSaveService', 'PlantService', function ($scope, GameService, autoSaveService, PlantService) {
        //Static for now until service for loading them from server is created
        $scope.powerPlants = PlantService.getPowerPlants();

        GameService.start();
        autoSaveService.startAutoSave();
    }]);