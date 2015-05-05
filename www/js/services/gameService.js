/**
 * Created by John on 5/05/2015.
 */
angular.module('welc.services', [])
    .service('GameService', ['$interval', function ($interval) {
        var running = false;
        var pollution = 0;  //Should be between 0 - 100
        var population = 100000; //Set initial population to 100, 000
        var powerPlants = []; //Contains all the power plants in the game

        var stepInterval = 2000;    //Run game logic every 1000 milliseconds
        var interval;   //This is the interval promise which will run the game

        this.addPowerPlant = function (powerPlant) {
            powerPlants.push(powerPlant);
        };

        this.removePowerPlant = function (powerPlant) {
            var powerPlantIndex = powerPlant.indexOf(powerPlant);
            if (powerPlantIndex > -1) {
                powerPlants.splice(powerPlantIndex, 1);
            }
        };

        this.getPowerPlants = function () {
            return powerPlants;
        };

        this.start = function () {
            running = true;
            interval = $interval(stepGame, stepInterval);
            console.log('Game is running');
        };

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