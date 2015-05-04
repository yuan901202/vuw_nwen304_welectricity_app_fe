angular.module('welc.controllers', [])
    .controller('HomeCtrl', ['$scope', 'GameService', function ($scope, GameService) {
        $scope.msg = 'Hello World';
        GameService.start();
    }]);
