/**
 * Created by John on 10/05/2015.
 */
angular.module('welc.controllers')
    .controller('GamePlayCtrl', ['$scope', 'GameService', 'autoSaveService', function ($scope, GameService, autoSaveService) {
        //Static for now until service for loading them from server is created
        $scope.powerPlants = [
            {name: 'Coal', image: 'img/powerPlants/Coal.png', id: 1, rating: 3},
            {name: 'Wind', image: 'img/powerPlants/Wind.png', id: 2, rating: 4},
            {name: 'Solar', image: 'img/powerPlants/Solar.png', id: 3, rating: 3},
            {name: 'Nuclear', image: 'img/powerPlants/Nuclear.png', id: 4, rating: 5}
        ];

        GameService.start();
        autoSaveService.startAutoSave();
    }]);