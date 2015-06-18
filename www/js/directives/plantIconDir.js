/**
 * Created by John on 10/05/2015.
 */
angular.module('welc.directives')
.directive('plantBar', function (popOverService) {
        return {
            scope: {
                powerPlants: '=plantBar'
            },
            templateUrl: 'templates/powerPlants.html',
            link: function(scope, element, attrs) {
                scope.popOver = popOverService;
            }
        }
    });