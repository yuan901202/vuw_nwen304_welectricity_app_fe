/**
 * Created by John on 10/05/2015.
 */
angular.module('welc.controllers')
    .controller('GamePlayCtrl', ['$scope', 'GameService', function ($scope, GameService) {
        //Static for now until service for loading them from server is created
        $scope.powerPlants = [
            {name: 'Coal', image: 'img/powerPlants/Coal.png', pollution: 4, energyOutput: 500, buyCost: 9900000},
            {name: 'Wind', image: 'img/powerPlants/Wind.png', pollution: 1, energyOutput: 2, buyCost: 3020000},
            {name: 'Solar', image: 'img/powerPlants/Solar.png', pollution: 1, energyOutput: 20, buyCost: 2790000},
            {name: 'Hydro', image: 'img/powerPlants/Hydro.png', pollution: 1, energyOutput: 500, buyCost: 2660000},
            {name: 'Nuclear', image: 'img/powerPlants/Nuclear.png', pollution: 1, energyOutput: 502, buyCost: 428000000},
            {name: 'Oil', image: 'img/powerPlants/Oil.png', pollution: 4, energyOutput: 10, buyCost: 1710000}
        ];

        $scope.gamePlants = GameService.getPlants();
    }]);