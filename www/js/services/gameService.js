/**
 * Created by John on 5/05/2015.
 */
angular.module('welc.services', [])
    .service('GameService', [function () {

        this.start = function() {
            alert('Game Started');
        }
    }])
;