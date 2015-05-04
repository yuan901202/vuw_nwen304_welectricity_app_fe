/**
 * Created by John on 5/05/2015.
 */
angular.module('welc.services', [])
    .service('GameService', [function () {
        var running = false;

        this.start = function () {
            running = true;
            console.log('Game is starting');
        };

        this.pause = function () {
            running = false;
            console.log('Game is pausing');
        };
    }])
;