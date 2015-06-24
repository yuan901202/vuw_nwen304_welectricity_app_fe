/**
 * Created by John on 18/06/2015.
 */
angular.module('welc.directives')
    .directive('popOver', function (popOverService, $rootScope) {
        return {
            templateUrl: 'templates/popOver.html',
            link: function (scope, element, attrs) {
                scope.plant = {};

                scope.showInfo = function () {
                    $('.expand').addClass('is-visible');
                };

                scope.hideInfo = function () {
                    $('.expand').removeClass('is-visible');
                };

                scope.hide = function() {
                    $('.popup').removeClass('is-visible');
                };

                function toggle(show, plant) {
                    if (show) {
                        scope.plant = plant;
                        $('.popup').addClass('is-visible');
                        //scope.$apply(); //Make sure the scope.plant is updated
                    } else {
                        scope.hide();
                    }
                }

                popOverService.subscribe(toggle);
            }
        }
    });