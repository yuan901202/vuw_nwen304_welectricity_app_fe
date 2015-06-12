/**
 * Created by John on 5/05/2015.
 */
angular.module('welc.services')
    .service('GameService', ['$interval', function ($interval) {
        var running = false;
        /*
        var pollution = 0;  //Should be between 0 - 100
        var population = 100000; //Set initial population to 100, 000
        */

        //-----Nicola's code start
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
		//-----Nicola's code end

        var stepInterval = 2000;    //Run game logic every 1000 milliseconds
        var interval;   //This is the interval promise which will run the game

        var powerPlants = [];

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
            //-----Nicola's code start
            pollutionCount();
            energyCount();
			populationCount();
			costCount();
			update();
			//-----Nicola's code end
            console.log("Game calculating......");
        };


        //-----Nicola's code start
        function pollutionCount(){
			//pollution = (power plant array pollution code here)
		}

		function energyCount(){
			//Energy Output
		    //Energy increases based on:
		    //Replace fakeEnergyOutput with the total energy output of power sources
		    energy = energyBase + fakeEnergyOutput + (Math.random() * 100);
		    //energy = energyBase + (POWER PLANT "energyOutput") + (Math.random() * 100);

		    //Do we have enough energy?
		    reqEnergy = (population * 0.5);
		    //Calculate energy difference for calculating population
		    energyDiff = energy - reqEnergy;
		    //console.log("energy " + energy);
		    //console.log("req energy " + reqEnergy);
		    //console.log("energyDiff " + energyDiff);
		}

		function populationCount(){
			//Population
		    //Calculate the rate that the population changes by

		    //If the energy difference is negative (not enough power)
		    if(energyDiff < 0) {
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

		function costCount(){
			//Cost
		    tempCost = population * 0.1;
		    cost += tempCost;
		    console.log("cost " + cost);    
		}		
		//-----Nicola's code end







    }])
;