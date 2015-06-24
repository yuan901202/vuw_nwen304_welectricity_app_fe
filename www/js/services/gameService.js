/**
 * Created by John on 5/05/2015.
 */
angular.module('welc.services')
    .service('GameService', ['$interval', 'saveLoadService', function ($interval) {
        this.maxPlants = 6;  //The maximum amount of power plants that the game can have
        var running = false;

        var population = 210000;
        var pollution = 0;
        var tempPopulation;
        var cost = 500000;
        var tempCost;
        var energy;
        var energyBase = 100000;
        var fakeEnergyOutput = 10500;
        var tempEnergy;
        var reqEnery;
        var energyDiff;
        var energyFactor;

        var stepInterval = 4000;    //Run game logic every 4000 milliseconds
        var interval;   //This is the interval promise which will run the game

        var powerPlants = [];   //All the power plants in the game

        var powerDemand = 10000; //TODO This needs to be updated when the maths of how it works if complete

        $interval.poll = pollution;
        $interval.pop = population;
        $interval.powOut = powerDemand;
        

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
            pollution = pollutionCount();

            energyCount();
            populationCount();
            costCount();
            update();
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


        /**
         * Returns the total pollution generated for all power plants
         * @returns {number}
         */
        function pollutionCount() {
            //pollution = (power plant array pollution code here)
            var totalPollution = 0;

            for(var i = 0; i < powerPlants.length; i++) {
                pollution += powerPlants[i].pollution;
            }

            return pollution;
        }

        function energyCount() {
            //Energy Output
            //Energy increases based on:
            //Replace fakeEnergyOutput with the total energy output of power sources
            energy = energyBase + fakeEnergyOutput + (Math.random() * 100);
            //energy = energyBase + (POWER PLANT "energyOutput") + (Math.random() * 100);

            //Do we have enough energy?
            reqEnergy = (population * 0.5);
            //Calculate energy difference for calculating population
            energyDiff = energy - reqEnergy;
        }

        function populationCount() {
            //Population
            //Calculate the rate that the population changes by

            //If the energy difference is negative (not enough power)
            if (energyDiff < 0) {
                //Population will decrease no matter what
                tempPopulation = -(Math.random() * 50);
            } else {
                //Population change = pollution level with a bit of random change
                tempPopulation = -(pollution * 3) + (Math.random() * 100);
            }

            //Update Population
            population += tempPopulation;
            console.log("temp pop " + tempPopulation);

            //Make sure if population is ever a negative number it displays as 0
            if (population < 0) {
                population = 0;
            }
        }

        function costCount() {
            //Cost
            tempCost = population * 0.1;
            cost += tempCost;
            console.log("cost " + cost);
        }

        /**
         * Get the total energy generated by all power plants in the game
         * @returns {number}
         */
        function getPlantEnergy() {
            var totalEnergy = 0;

            for(var i = 0; i < powerPlants.length; i++) {
                totalEnergy += powerPlants[i].energyOutput;
            }

            return totalEnergy;
        }
    }]);
