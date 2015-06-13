/**
 * Created by John on 5/05/2015.
 */
angular.module('welc.services')
    .service('GameService', ['$interval', function ($interval) {
        var running = false;
        var pollution = 0;  //Should be between 0 - 100
        var population = 100000; //Set initial population to 100, 000

        var stepInterval = 2000;    //Run game logic every 1000 milliseconds
        var interval;   //This is the interval promise which will run the game

        var powerPlants = [];

        this.getGame = function(){
            var powerDemand = 10000;
            return {population: population, pollution: pollution, power_demand: powerDemand, plants: powerPlants};
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
        };
    }])
;