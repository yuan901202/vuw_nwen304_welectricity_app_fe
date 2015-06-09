/**
 * Created by John on 10/05/2015.
 */
angular.module('welc.directives')
    .directive('plantDrop', ['GameService', function (GameService) {
        return {
            templateUrl: 'templates/plantDrop.html',
            link: function link(scope, element, attrs) {

                var previous;   //Used to remove a power plant from the game if a new one is dropped on to of it.

                /**
                 * Adds the dropped power plant to the game. Is bound to onDrop event in the template
                 */
                scope.drop = function () {
                    //Remove the previous power plant
                    GameService.removePlant(previous);
                    previous = scope.droppedPlant;

                    //Add the dropped power plant to the game.
                    GameService.addPlant(scope.droppedPlant);
                };
            }
        }
    }]);