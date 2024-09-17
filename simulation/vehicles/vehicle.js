/**
 * The Parent Class that inherent the controls of the vehicles category
 */
class Vehicle {
    constructor(vehicleType, lane) {
        this.arrivalTime = Date.now()
        this.waitingTime = 0
        // this.running = false
        this.lane = lane 
        this.vehicleType = vehicleType
    }

    updateWaitingTime() {
        // The 1000 is equivalent to 1 seconds
        this.waitingTime = (Date.now() - this.arrivalTime) / 1000;
    }

    move() {
        // Working on vehicle ai now
    }

    addVehicleHtmlElement() {
        // Working on
    }
}


module.exports = { Vehicle }