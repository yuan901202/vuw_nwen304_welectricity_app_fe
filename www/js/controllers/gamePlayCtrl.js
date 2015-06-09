/**
 * Created by John on 10/05/2015.
 */
angular.module('welc.controllers')
    .controller('GamePlayCtrl', ['$scope', 'GameService', function ($scope, GameService) {
        //Static for now until service for loading them from server is created
        $scope.powerPlants = [
            {name: 'Coal', image: 'img/powerPlants/Coal.png'},
            {name: 'Wind', image: 'img/powerPlants/Wind.png'},
            {name: 'Solar', image: 'img/powerPlants/Solar.png'},
            {name: 'Hydro', image: 'img/powerPlants/Nuclear.png'}
        ];

        $scope.gamePlants = GameService.getPlants();
    }]);