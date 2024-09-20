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

    addVehicle(vehicle) {
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
}

// TODO: Needed for waiting times of each vehicle in lanes
// setInterval()