/**
 * Created by John on 5/05/2015.
 */
angular.module('welc.services')
    .service('GameService', ['$interval', 'PlantService', '$rootScope', function ($interval, PlantService, $rootScope) {
        this.maxPlants = 6;  //The maximum amount of power plants that the game can have
        var running = false;

        

        //The stats for the game that can be seen by the user
        var gameStats = {
            playerMoney: 500000,
            population: 210000,
            pollution: 0,
            energyNeed: 0,
            energyMade: 0
        };

        var tempPopulation;

        var energyDiff;

        var stepInterval = 4000;    //Run game logic every 4000 milliseconds
        var interval;   //This is the interval promise which will run the game

        var powerPlants = [];   //All the power plants in the game
        var powerDemand = 10000; //TODO This needs to be updated when the maths of how it works if complete

        this.stats = function () {
            return gameStats;
        };

        /**
         * Return the game as an object so that it can be saved.
         * @returns {{population: number, pollution: number, power_demand: number, plants: Array}} - The current game as an object
         */
        this.getGame = function () {
            return {
                population: gameStats.population,
                pollution: gameStats.pollution,
                power_demand: powerDemand,
                plants: getPowerPlantIds()
            };
        };

        /**
         * Set the game variables. This should only be used for loading (or cheating by the devs!)
         * @param game - The game object to load into current game. Should be in the same format that the getGame function returns
         */
        this.loadGame = function (game) {
            gameStats.population = game.population;
            gameStats.pollution = game.pollution;
            powerDemand = game.power_demand;
            var plants = PlantService.getPowerPlants();
            powerPlants = [];

            for(var i = 0; i < game.plants.length; i++) {
                for(var j = 0; j < plants.length; j++) {
                    if(game.plants[i] == plants[j].id) {
                        powerPlants.push(plants[j]);
                    }
                }
            }
            $rootScope.$broadcast('GameLoaded');
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
            if(gameStats.playerMoney > plant.cost) {
                gameStats.playerMoney -= plant.cost;
                powerPlants.push(plant);
            }
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

            if(gameStats.pollution > pollutionCount()) {
                //decrease pollution by 5% of total pollution
                gameStats.pollution -= Math.round(gameStats.pollution * 0.05);
            } else {
                //Increase pollution by 10% of plant pollution output
                gameStats.pollution += Math.round(pollutionCount() * 0.1);
            }

            energyCount();
            populationCount();
            costCount();
        }

        /**
         * Get the ids of every power plant in the game.
         * @returns {Array} - An array of all ids (integers) of all power plants in the game
         */
        function getPowerPlantIds() {
            var ids = [];
            for (var i = 0; i < powerPlants.length; i++) {
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

            for (var i = 0; i < powerPlants.length; i++) {
                totalPollution += powerPlants[i].pollution;
            }

            return totalPollution;
        }

        function energyCount() {
            //Energy Output
            //Energy increases based on:
            var energy = getPlantEnergy();

            //Do we have enough energy?
            var reqEnergy = (gameStats.population * 0.5);

            //Calculate energy difference for calculating population
            energyDiff = energy - reqEnergy;
            gameStats.energyNeed = reqEnergy;
            gameStats.energyMade = energy;
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
                tempPopulation = -(gameStats.pollution * 3) + (Math.random() * 100);
            }

            //Update Population
            gameStats.population += Math.round(tempPopulation);

            //Make sure if population is ever a negative number it displays as 0
            if (gameStats.population < 0) {
                gameStats.population = 0;
            }
        }

        function costCount() {
            gameStats.playerMoney += (gameStats.population * 0.1);
        }

        /**
         * Get the total energy generated by all power plants in the game
         * @returns {number}
         */
        function getPlantEnergy() {
            var totalEnergy = 0;

            for (var i = 0; i < powerPlants.length; i++) {
                totalEnergy += powerPlants[i].energy;
            }

            return totalEnergy;
        }
    }]);
