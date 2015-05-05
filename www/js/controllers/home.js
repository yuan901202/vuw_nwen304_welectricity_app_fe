angular.module('welc.controllers', [])
    .controller('HomeCtrl', ['$scope', 'GameService', '$timeout', function ($scope, GameService, $timeout) {
        $scope.msg = 'Hello World';
        GameService.start();

        //Will pause the game after 4100 milliseconds. Just an example of game service start and pause
        $timeout(GameService.pause, 4100);

        $timeout(GameService.start, 5100);

        $timeout(GameService.pause, 9000);
    }]);
