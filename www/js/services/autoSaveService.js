/**
 * Created by John on 20/06/2015.
 */
angular.module('welc.services')
    .service('autoSaveService', ['saveLoadService', 'GameService', '$interval', function (saveLoadService, GameService, $interval) {

        var saveIntervalTime = 120000;  //Time in milliseconds between saves. Default = 2 minutes
        var saveInterval;

        /**
         * Start auto saving the game.
         */
        this.startAutoSave = function () {
            saveInterval = $interval(function () {
                saveLoadService.saveGame(GameService.getGame());
            }, saveIntervalTime);
        };

        /**
         * Stop auto saving the game.
         */
        this.stopAutoSave = function () {
            $interval.cancel(saveInterval);
        };

        /**
         * Set the interval between game saves
         * @param interval - The time in milliseconds between saves
         */
        this.setSaveInterval = function (interval) {
            saveIntervalTime = interval;

            //Reset the auto save so that it uses the new interval
            this.stopAutoSave();
            this.startAutoSave();
        };
    }]);
