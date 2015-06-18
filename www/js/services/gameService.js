/**
 * Created by John on 5/05/2015.
 */
angular.module('welc.services')
    .service('GameService', ['$interval', 'saveLoadService', function ($interval, saveLoadService) {
        var running = false;
        var pollution = 0;  //Should be between 0 - 100
        var population = 100000; //Set initial population to 100, 000

        var stepInterval = 4000;    //Run game logic every 4000 milliseconds
        var interval;   //This is the interval promise which will run the game

        var powerPlants = [];   //All the power plants in the game

        var powerDemand = 10000; //TODO This needs to be updated when the maths of how it works if complete

        /**
         * Return the game as an object so that it can be saved.
         * @returns {{population: number, pollution: number, power_demand: number, plants: Array}} - The current game as an object
         */
        this.getGame = function () {
            return {population: population, pollution: pollution, power_demand: powerDemand, plants: getPowerPlantIds()};
        };

        /**
         * Set the game variables. This should only be used for loading (or cheating by the devs!)
         * @param game - The game object to load into current game. Should be in the same format that the getGame function returns
         */
        this.loadGame = function(game) {
            population = game.population;
            pollution = game.pollution;
            powerDemand = game.power_demand;
            powerPlants;    //TODO Load all power plants from a service based on there id. Waiting on service to load all power plants from server.
        };

        /**
         * Return all power plants in the game
         * @returns {*}
         */
        this.getPlants = function () {
            return powerPlants;
        };

        /**
         * Add a power plant to the game
         * @param plant - The power plant to add
         */
        this.addPlant = function (plant) {
            powerPlants.push(plant);
        };

        /**
         * Remove a power plant from the game. Will not remove from game if plant is not in game.
         * @param plant - The plant to remove
         */
        this.removePlant = function (plant) {
            var index = powerPlants.indexOf(plant);
            if (index > -1) {    //Check that the plant is in the game already
                powerPlants.splice(index, 1);
            }
        };

        /**
         * Start running the game
         */
        this.start = function () {
            running = true;
            interval = $interval(stepGame, stepInterval);
            console.log('Game is running');
        };

        /**
         * Pause the running of the game.
         */
        this.pause = function () {
            running = false;
            $interval.cancel(interval);
            console.log('Game is paused');
        };

        /**
         * This is where the game logic that should get run constantly goes.
         * i.e pollution calculations
         */
        function stepGame() {
            //Need some fancy algorithm here to calculate all the game state based on the games variables
            console.log("Game calculating......");

            //var powerDemand = 10000;    //TODO This needs to be updated when the maths of how it works if complete
            //saveLoadService.saveGame({population: population, pollution: pollution, power_demand: powerDemand, plants: getPowerPlantIds()});
        };

        /**
         * Get the ids of every power plant in the game.
         * @returns {Array} - An array of all ids (integers) of all power plants in the game
         */
        function getPowerPlantIds() {
            var ids = [];
            for(var i = 0; i < powerPlants.length; i++) {
                ids.push(powerPlants[i].id);
            }
            return ids;
        }
    }])
;