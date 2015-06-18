/**
 * Created by John on 18/06/2015.
 */
angular.module('welc.services')
    .service('popOverService', function () {

        var shown = false,
            callbacks = [];

        /**
         * Show the popover
         * @type {show}
         */
        this.show = show;

        /**
         * Hide the popover
         * @type {hide}
         */
        this.hide = hide;

        this.isShown = function () {
            return shown;
        };

        function hide() {
            shown = false;

            //Call all callbacks
            for(var i = 0; i < callbacks.length; i++) {
                callbacks[i](shown, {});
            }
        }

        function show(plant) {
            shown = true;

            //Call all callbacks
            for(var i = 0; i < callbacks.length; i++) {
                callbacks[i](shown, plant);
            }
        }

        /**
         * Toggle the visibility of the popover.
         */
        this.toggle = function (plant) {
            //TODO: The jquery in this service should be in a directive and the directive should watch this
            if (shown) {
                hide();
            } else {
                show(plant);
            }
        };

        /**
         * Subscribe a function to get called when ever the popover is toggled. This is a quick work around to easiler support $watch in ionic app
         * @param callback
         */
        this.subscribe = function(callback) {
            callbacks.push(callback);
        }

    });