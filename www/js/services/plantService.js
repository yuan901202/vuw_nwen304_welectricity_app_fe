/**
 * Created by John on 23/06/2015.
 */
angular.module('welc.services')
    .service('PlantService', function () {
        //TODO: These should be loaded from the server when the server part is complete
        var wind = {
            name: 'Wind',
            image: 'img/powerPlants/wind1.png',
            id: 2,
            location: 'Hill',
            energy: 25,
            pollution: 10,
            cost: 550000,
            info: "Wind is constantly present on earth, caused by convection currents, controlled by the energy from the sun. Wind causes huge amounts of kinetic energy, due to the fast rate at which it moves, and this can be converted into electricity using wind turbines. The wind forces the blades of a windmill to turn, which spins a turbine inside a small generator, which then produces electricity. Because the generators are small, turbines are often grouped together and placed on high hills to generate a sufficient amount of energy for their intended purpose. Wind energy converted by windmills has been around for thousands of years, as they were once used on farms to mill grains or pump water. However, windmills have only recently become an incredibly popular energy resource."
        };
        var coal = {
            name: 'Coal',
            image: 'img/powerPlants/coal1.png',
            id: 1,
            energy: 75,
            pollution: 70,
            cost: 750000,
            location: 'Land',
            info: "Coal is converted to electricity by being ignited in a furnace. This heats water in a boiler, which turns into steam. Finally, the steam spins turbine generators to produce electricity. This process is very similar to how nuclear power works. After spinning the turbine, the steam gathers into a large chamber called a condenser. Cool water from a nearby source runs through tubes, running through the condenser. This turns the steam back into water, so it can be used over and over again by the coal plant. Coal has had the largest growth of all energy sources in recent years and it's the world's largest source of energy. However, coal isn't a renewable energy resource and also contributes to climate change and pollution."
        };
        var solar = {
            name: 'Solar',
            image: 'img/powerPlants/solar1.png',
            id: 3,
            energy: 20,
            pollution: 5,
            cost: 450000,
            location: 'Hill',
            info: "Solar energy has been around since the beginning of time and as the name suggests, the energy comes from the sun. Humans regularly use solar energy to perform tasks such as drying clothes, heating houses and purifying water. Solar energy is also able to generate electricity. As technology has improved, the cost of creating electricity through solar energy has decreased. Usually, many flat planes called solar cells are put together to create solar panels. The solar cells works by using light particles to knock electrons around, which in turn create energy currents. Although solar energy's efficiency is increasing, its contribution to the world's energy supply is comparatively low."
        };
        var nuclear = {
            name: 'Nuclear',
            image: 'img/powerPlants/nuclear1.png',
            id: 4,
            energy: 100,
            pollution: 15,
            cost: 1600000,
            location: 'Land',
            info: "Similar in process to power generated through coal, nuclear energy is also created through steam spinning a turbine, which drives generators to make electricity. The source of the energy comes from the center of an atom. To use this energy, the nucleus (center of an atom) has to be released from the atom. This achieved through fusion or fission. Fusion combines two or more small atoms, to make a new atom and thus, releasing extra energy. Fission is the process of splitting a larger atom into two smaller atoms. The smaller atoms don't need as much energy to bind them, compared to the large atom, so the extra energy is released. Since 1987, New Zealand has been nuclear free. Many disagree with nuclear power as a good source of energy, as it's closely tied with weapons of mass destruction and if damage was to occur to a nuclear plant, radioactive waste could become a danger for future generations. "
        };

        var powerPlants = [wind, coal, solar, nuclear];

        this.getPowerPlants = function() {
            return powerPlants;
        };
    });