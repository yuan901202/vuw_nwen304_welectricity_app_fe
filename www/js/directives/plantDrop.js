/**
 * Created by John on 10/05/2015.
 */
angular.module('welc.directives')
    .directive('plantDrop', ['GameService', function (GameService) {
        return {
            templateUrl: 'templates/plantDrop.html',
            link: function link(scope, element, attrs) {

                /**
                 * Adds the dropped power plant to the game. Is bound to onDrop event in the template
                 */
                scope.drop = function () {
                    //Add the dropped power plant to the game.
                    GameService.addPlant(scope.droppedPlant);
                }
            }
        }
    }]);