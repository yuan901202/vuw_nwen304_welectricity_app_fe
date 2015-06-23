/**
 * Created by John on 10/05/2015.
 */
angular.module('welc.controllers')
    .controller('GamePlayCtrl', ['$scope', 'GameService', 'autoSaveService', 'PlantService', 'MediaService', function ($scope, GameService, autoSaveService, PlantService, MediaService) {
        //Static for now until service for loading them from server is created
        $scope.powerPlants = PlantService.getPowerPlants();
        var dropSound;

        MediaService.loadMedia('sound/Blop.mp3').then(function (media) {
            dropSound = media;
        });

        $scope.plants = GameService.getPlants();

        $scope.drop = function (event, ui) {
            var plant = ui.draggable.scope().powerPlant;

            //Check to make sure we do not add any more plants if we already have the maximum amount
            if (GameService.getPlants().length !== GameService.maxPlants) {
                dropSound.play();
                GameService.addPlant(plant);
            }
        };

        GameService.start();
        autoSaveService.startAutoSave();
    }]);