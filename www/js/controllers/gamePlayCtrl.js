/**
 * Created by John on 10/05/2015.
 */
angular.module('welc.controllers')
    .controller('GamePlayCtrl', ['$scope', 'GameService', 'autoSaveService', 'PlantService', 'MediaService', '$ionicPopup', 'AuthService', '$state',
        function ($scope, GameService, autoSaveService, PlantService, MediaService, $ionicPopup, AuthService, $state) {
            if (!AuthService.loggedIn()) {
                $state.go('Login');
            }


            var dropSound;  //The sound to play when a power plant is dropped into the game

            $scope.powerPlants = PlantService.getPowerPlants();
            $scope.stats = GameService.stats();

            //Preload our plant drop sound
            MediaService.loadMedia('sound/Blop.mp3').then(function (media) {
                dropSound = media;
            });

            $scope.plants = GameService.getPlants();


            //Ionic caches scope show reload data on enter
            $scope.$on('$ionicView.enter', function() {
                console.log('enter');
                $scope.stats = GameService.stats();
                $scope.plants = GameService.getPlants();
            });

            //Load game data when game is loaded
            $scope.$on('GameLoaded', function() {
                console.log('enter');
                $scope.stats = GameService.stats();
                $scope.plants = GameService.getPlants();
            });

            /**
             * This function is called anytime a power plant is dropped into the gameplay area
             * @param event
             * @param ui
             */
            $scope.drop = function (event, ui) {
                var plant = ui.draggable.scope().powerPlant;    //The plant that was dropped

                if (GameService.stats().playerMoney > plant.cost) {
                    //Check to make sure we do not add any more plants if we already have the maximum amount
                    if (GameService.getPlants().length !== GameService.maxPlants) {
                        dropSound.play();
                        GameService.addPlant(plant);
                    }
                } else {
                    $ionicPopup.alert({
                        title: 'Fail',
                        template: 'You do not have enough money to buy that power plant'
                    })
                }
            };

            GameService.start();
            autoSaveService.startAutoSave();
        }]);