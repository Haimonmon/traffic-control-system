const { Vehicle } = require('../vehicles/vehicle.js');
const { fuzzyy } = require('../fuzzyLogic/fuzzy.js')

class TrafficLightSystem {
    constructor(laneHandle) {
        this.redLight = false
        this.amberLight = false
        this.greenLight = false
        this.vehicles = [];
        this.laneHandle = laneHandle
    }

    addDetectedVehicle(vehicle) {
        this.vehicles.push(vehicle);
    }

    updateWaitingTimeOfVehicles() {
        this.vehicles.forEach(vehicle => vehicle.updateWaitingTime());
    }

    handleLightDuration() {
        const totalWaitingTime = this.vehicles.reduce((total, vehicle) => total + vehicle.waitingTime, 0);
        const averageWaitingTime = totalWaitingTime / this.vehicles.length
        const trafficDensity = this.vehicles.length
    }

    printList() {
        console.log(this.vehicles)
    }
}

// TODO: Needed for waiting times of each vehicle in lanes
// setInterval()
// * also if the light countdown comes to an near end of 5 seconds, it will start to compute the total duration of the green light

if (require.main === module) {
    const trafficLight = new TrafficLightSystem()

    const vehicle1 = new Vehicle()
    const vehicle2 = new Vehicle()
    const vehicle3 = new Vehicle()
    const vehicle4 = new Vehicle()
    
    trafficLight.addDetectedVehicle(vehicle1)
    trafficLight.addDetectedVehicle(vehicle2)
    trafficLight.addDetectedVehicle(vehicle3)
    trafficLight.addDetectedVehicle(vehicle4)

    setInterval(() => {
        trafficLight.updateWaitingTimeOfVehicles()
        console.log('Updating waiting time')
        trafficLight.printList()
    },1000)
}