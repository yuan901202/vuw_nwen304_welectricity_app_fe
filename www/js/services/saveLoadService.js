/**
 * Created by John on 13/06/2015.
 */
angular.module('welc.services')
    .service('saveLoadService', ['$http', function ($http) {
        var host = "";  //The location of the server that has the data

        function saveGame(population, pollution, powerDemand, powerPlants) {

            //This is the game that is going to be sent to the backend to be saved
            var game = {population: population, pollution: pollution, power_demand: powerDemand, plants: powerPlants};

            $http.post(host, game).then(function(){
                //Saved successfully
            }, function() {
                //Something went wrong
            });
        };

        function loadGame() {
            return $http.post(host).then(function(game){
                //Saved successfully
                return game;
            }, function() {
                //Something went wrong
            });
        };

        return {
            saveGame: saveGame,
            loadGame: loadGame
        }
    }])
;