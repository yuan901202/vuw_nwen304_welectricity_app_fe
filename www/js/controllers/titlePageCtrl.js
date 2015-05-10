angular.module('welc.controllers', [])
    .controller('TitlePageCtrl', ['$scope', 'GameService', '$timeout', function ($scope, GameService, $timeout) {
        $scope.msg = 'Hello World';
    }]);
