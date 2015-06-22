/**
 * Created by John on 10/05/2015.
 */
angular.module('welc.controllers')
    .controller('GamePlayCtrl', ['$scope', 'GameService', 'autoSaveService', 'MediaService', function ($scope, GameService, autoSaveService, MediaService) {
        var dropSound;

        MediaService.loadMedia('sound/Blop.mp3').then(function(media) {
           dropSound = media;
        });

        //Static for now until service for loading them from server is created
        $scope.powerPlants = [
            {name: 'Coal', image: 'img/powerPlants/coal1.png', id: 1, pollution: 4, energyOutput: 500, buyCost: 9900000, location: 'Land'},
            {name: 'Hydro', image: 'img/powerPlants/hydro1.png', id: 2, pollution: 1, energyOutput: 500, buyCost: 2660000, location: 'Water'},
            {name: 'Nuclear', image: 'img/powerPlants/nuclear1.png', id: 3, pollution: 1, energyOutput: 502, buyCost: 428000000, location: 'Land'},
            {name: 'Oil', image: 'img/powerPlants/oil1.png', id: 4, pollution: 4, energyOutput: 10, buyCost: 1710000, location: 'Land'},
            {name: 'Solar', image: 'img/powerPlants/solar1.png', id: 5, pollution: 1, energyOutput: 20, buyCost: 2790000, location: 'Hill'},
            {name: 'Wind', image: 'img/powerPlants/wind1.png', id: 6, pollution: 1, energyOutput: 2, buyCost: 3020000, location: 'Hill'}
        ];


        $scope.plants = GameService.getPlants();

        $scope.drop = function(event, ui) {
            var plant = ui.draggable.scope().powerPlant;

            //Check to make sure we do not add any more plants if we already have the maxamum amount
            if(GameService.getPlants().length !== GameService.maxPlants) {
                dropSound.play();
                GameService.addPlant(plant);
            }
        };

        GameService.start();
        autoSaveService.startAutoSave();
    }]);