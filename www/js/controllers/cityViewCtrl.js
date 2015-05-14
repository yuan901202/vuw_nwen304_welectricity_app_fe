/**
 * Created by Tony
 */

angular.module('welc.controllers', [])
    .controller('CityViewCtrl', ['$scope', 'GameService', '$timeout', function ($scope, GameService, $timeout) {
        $scope.msg = 'City Viewer';
    }]);
