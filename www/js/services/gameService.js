/**
 * Created by John on 5/05/2015.
 */
angular.module('welc.services')
    .service('GameService', ['$interval', function ($interval) {
        var running = false;
        var pollution = 0;  //Should be between 0 - 100
        var population = 100000; //Set initial population to 100, 000
        var powerPlants = [];

        var stepInterval = 2000;    //Run game logic every 1000 milliseconds
        var interval;   //This is the interval promise which will run the game

        //Stats
        var popChangePer = 0.08;    //The percentage to grow or shrink the population by
        var popPowerDif = 1.1;    //The percentage threshold before the population should change due to power.
        var powerPerPerson = .909;  //The power usage per person in mWh
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
            //Average power use per person per month in mWh (i.e 909 kWh)
            var powerDemand = population * powerPerPerson;

            //Should grow population if 10% more power then demand or shronk if power demand is 10% greater then generation.
            if((powerDemand * popPowerDif) < calculatePowerGeneration()) {
                //Grow population
                population += population * popChangePer ;
            } else if((powerDemand * popPowerDif) > calculatePowerGeneration()) {
                //shrink population
                population -= population * popChangePer;
            }

            //Calculate pollution

            //Need some fancy algorithm here to calculate all the game state based on the games variables
            console.log("Game calculating......");
        };

        /**
         * Calculate the total electricity produced from power plants
         * @returns {number}
         */
        function calculatePowerGeneration() {
            var totalPowerGen = 0;

            for(var i = 0; i < powerPlants.length; i++) {
                totalPowerGen += powerPlants[i];
            }

            return totalPowerGen;
        }
    }])
;