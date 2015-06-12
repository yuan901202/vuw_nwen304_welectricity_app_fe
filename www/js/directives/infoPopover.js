/**
 * Created by John on 13/06/2015.
 */
angular.module('welc.directives')
    .directive('infoPopover', ['$ionicGesture', function ($ionicGesture) {
        return {
            link: function link(scope, element, attrs) {

                /**
                 * Will show a popover above the current element
                 */
                var showPopover = function() {

                };

                //Listen for the ontap event and show a popover when it happens.
                $ionicGesture.on('tap', showPopover, element, {});
            }
        }
    }]);