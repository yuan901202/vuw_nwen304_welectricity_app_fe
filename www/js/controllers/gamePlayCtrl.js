/**
 * Created by John on 10/05/2015.
 */
angular.module('welc.controllers')
    .controller('GamePlayCtrl', ['$scope', 'GameService', 'autoSaveService', 'PlantService', 'MediaService', function ($scope, GameService, autoSaveService, PlantService, MediaService) {

        $scope.powerPlants = PlantService.getPowerPlants();
        var dropSound;

        //Preload our plant drop sound
        MediaService.loadMedia('sound/Blop.mp3').then(function (media) {
            dropSound = media;
        });

        $scope.plants = GameService.getPlants();

        /**
         * This function is called anytime a power plant is dropped into the gameplay area
         * @param event
         * @param ui
         */
        $scope.drop = function (event, ui) {
            var plant = ui.draggable.scope().powerPlant;    //The plant that was dropped

            //Check to make sure we do not add any more plants if we already have the maximum amount
            if (GameService.getPlants().length !== GameService.maxPlants) {
                dropSound.play();
                GameService.addPlant(plant);
            }
        };

        GameService.start();
        autoSaveService.startAutoSave();
    }]);