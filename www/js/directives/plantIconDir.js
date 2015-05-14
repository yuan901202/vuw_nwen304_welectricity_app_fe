/**
 * Created by John on 10/05/2015.
 */
angular.module('welc.directives', [])
.directive('plantBar', function () {
        return {
            scope: {
                powerPlants: '=plantBar'
            },
            templateUrl: 'templates/powerPlants.html'
        }
    });