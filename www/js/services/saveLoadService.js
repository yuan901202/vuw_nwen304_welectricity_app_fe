/**
 * Created by John on 13/06/2015.
 */
angular.module('welc.services')
    .service('saveLoadService', ['$http', 'userInfoService', function ($http, userInfoService) {
        var host = "https://guarded-earth-8421.herokuapp.com/game";  //The location of the server that has the data

        /**
         * Save a game to the server
         * @param game - The game object to save
         */
        this.saveGame = function (game) {
            //This is the game that is going to be sent to the backend to be saved
            game.userId = userInfoService.getUserId();

            return $http.post(host, game).then(function (data) {
                //Saved successfully
                return data;
            });
        };

        /**
         * Load a game from the server
         * @returns {*}
         */
        this.loadGame = function () {
            var userId = userInfoService.getUserId();
            return $http.get(host, {user_id: userId}).then(function (game) {
                //Saved successfully
                return game;
            }, function (error) {
                //Something went wrong
                return error;
            });
        };
    }])
;