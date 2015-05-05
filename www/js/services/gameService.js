/**
 * Created by John on 5/05/2015.
 */
angular.module('welc.services', [])
    .service('GameService', [function () {
        var running = false;
        var pollution = 0;  //Should be between 0 - 100
        var population = 100000; //Set initial population to 100, 000
        var powerPlants = []; //Contains all the power plants in the game

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
            console.log('Game is starting');
        };

        this.pause = function () {
            running = false;
            console.log('Game is pausing');
        };
    }])
;