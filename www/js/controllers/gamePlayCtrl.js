/**
 * Created by John on 10/05/2015.
 */
angular.module('welc.controllers')
    .controller('GamePlayCtrl', ['$scope', 'GameService', function ($scope, GameService) {
        //Static for now until service for loading them from server is created
        $scope.powerPlants = [
            {name: 'Coal', image: 'img/powerPlants/Coal.png', id: 1},
            {name: 'Wind', image: 'img/powerPlants/Wind.png', id: 2},
            {name: 'Solar', image: 'img/powerPlants/Solar.png', id: 3},
            {name: 'Hydro', image: 'img/powerPlants/Nuclear.png', id: 4}
        ];

        $scope.gamePlants = GameService.getPlants();
    }]);