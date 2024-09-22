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

class GenerateVehicle {
    constructor(trafficVolume, lanes) {
        this.trafficVolume = trafficVolume // This will be on percentages: 0.10 = 10% example, so by tenths 10,20,30,40,50,60,70,80,90,100 percentages
        this.vehicleType = ['Car','Car','Car','Car', 'Bus', ,'Car', 'Truck', 'Emergency']
        this.lanes = lanes // Array also
        this.baseTimeInterval = 1000; // *1 Seconds
    }

    pickRandomVehicle() {
        return this.vehicleType[Math.floor(Math.random() * this.vehicleType.length)]
    }

    pickRandomLane() {
        return this.lanes[Math.floor(Math.random() * this.lanes.length)]
    }

    generate() {
        const pickedVehicle = this.pickRandomVehicle()
        const pickedLane = this.pickRandomLane()

        console.log(`${pickedVehicle} taking lane ${pickedLane}`)
    }
    
    adjustTimeInterval() {
        if (this.trafficVolume <= 0.3) { // ? 10% - 30%
            return this.baseTimeInterval * 3;
        } else if (this.trafficVolume <= 0.6) { // ? 40% - 60%
            return this.baseTimeInterval * 2;
        } else if (this.trafficVolume <= 0.9) { // ? 70% - 90%
            return this.baseTimeInterval + 700;
        }

        return this.baseTimeInterval // ? 100% or Rush Hour

    }

    startGeneration() {
        const timeInterval = this.adjustTimeInterval()
        console.log(timeInterval,'Seconds')

        setInterval(() => {
            this.generate()
        }, timeInterval)
    }
}

if (require.main === module) {
    const generator = new GenerateVehicle(0.1, [1,2,3,4,5,6,7,8]) // Btw this lane is a crossing , each sides have 2 lanes
    generator.startGeneration()
}

module.exports = { Vehicle }