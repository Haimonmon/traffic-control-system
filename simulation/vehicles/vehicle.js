const buses = [
    './vehicles/bus/images/BUS-CYAN-0001.png'
]

const cars = [
    './vehicles/car/images/CAR-BLUE-0001-.png',
    './vehicles/car/images/CAR-YELLOWCAB-0002.png',
    './vehicles/car/images/CAR-YELLOW-PICKUP-0003.png',
    './vehicles/car/images/CAR-GREEN-0004.png',
    './vehicles/car/images/CAR-SHORT-BLUE-0005.png',
    './vehicles/car/images/CAR-BLUE-PICKUP-0006.png',
    './vehicles/car/images/CAR-GREEN-0007.png'
]

const trucks = [
    './vehicles/truck/images/TRUCK-GREEN-0001.png',
    './vehicles/truck/images/TRUCK-LONG-BLUE-0002.png'
]

const emergency = [
    './vehicles/emergency/images/EMERGENCY-AMBULANCE-0001.png',
    './vehicles/emergency/images/EMERGENCY-FIRE-TRUCK-0002.png',
    './vehicles/emergency/images/EMERGENCY-POLICE-CAR-0003.png'
]

/**
 * The Parent Class that inherent the controls of the vehicles category
 */
export class Vehicle {
    constructor(vehicleType, lane, xPos = -100, yPos = 10, stopPos = {x: 285, y:null}) {
        // Default xPos will serve as the starting point of spawning
        this.arrivalTime = Date.now()
        this.waitingTime = 0
        this.lane = lane 
        this.vehicleType = vehicleType

        this.xPos = xPos
        this.yPos = yPos
        // this.width = width
        // this.height = height
        this.speed = 5

        this.stopPos = stopPos

        //create DOM element:
        this.vehicleContainerElement = document.createElement('div')
        this.vehicleContainerElement.classList.add('vehicle')
        this.vehicleContainerElement.classList.add(vehicleType)

        this.vehicleContainerElement.style.left = `${xPos}px`
        this.vehicleContainerElement.style.top = `${yPos}%`

        this.imgVehicleElement = document.createElement('img')
        this.imgVehicleElement.src = this.setVehicleImage(vehicleType)
        this.imgVehicleElement.alt = vehicleType

        this.vehicleContainerElement.appendChild(this.imgVehicleElement)

        this.lane.appendChild(this.vehicleContainerElement)
    }

    randomVehicleStyle(array) {
        return array[Math.floor(Math.random() * array.length)]
    }

    setVehicleImage(vehicleType) {
        if (vehicleType === 'car') {
            return this.randomVehicleStyle(cars)
        } else if (vehicleType === 'bus') {
            return this.randomVehicleStyle(buses)
        } else if (vehicleType === 'truck') {
            return this.randomVehicleStyle(trucks)
        } else if (vehicleType === 'emergency') {
            return this.randomVehicleStyle(emergency)
        }
    }

    updateWaitingTime() {
        // The 1000 is equivalent to 1 seconds
        this.waitingTime = (Date.now() - this.arrivalTime) / 1000;
    }

    move(vehicleInFront = null) {
        if (this.speed > 0) {
            if (vehicleInFront && this.isVehicleInFront(vehicleInFront)) {
                this.stop()
                return
            }

            // * HORIZONTAL MOVEMENTS
            if (this.stopPos.x !== null) {
                this.xPos += this.speed;
                this.vehicleContainerElement.style.left = `${this.xPos}px`

                if (this.xPos >= this.stopPos.x) {
                    this.stop()
                }

                return
            }

            // * VERTICAL MOVEMENTS
            if (this.stopPos.y !== null) {
                this.yPos += this.speed;
                this.vehicleContainerElement.style.top = `${this.yPos}%`;

                if (this.yPos >= this.stopPos.y) {
                    this.stop();
                }

                return
            }

            this.xPos += this.speed;
            this.vehicleContainerElement.style.left = `${this.xPos}px`
        }
    }

    stop() {
        this.speed = 0
    }

    isVehicleInFront(vehicleInFront, safeDistance = 80) {
        // 50 gap between vehicle

        const distance = Math.abs(vehicleInFront.xPos - this.xPos) // ! Horizontal testing

        return distance > 0 && distance < safeDistance;
    }
}

export class GenerateVehicle {
    constructor(trafficVolume, lanes, maxVehicle) {
        this.trafficVolume = trafficVolume // This will be on percentages: 0.10 = 10% example, so by tenths 10,20,30,40,50,60,70,80,90,100 percentages
        this.vehicleType = ['car']; // ['Car','Car','Car','Car', 'Bus', ,'Car', 'Truck', 'Emergency']
        this.lanes = lanes // Array also
        this.maxVehicle = maxVehicle
        this.baseTimeInterval = 1000; // *1 Seconds
        this.generatedVehicles = [];
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

        if (pickedLane && pickedVehicle) {
            const vehicle = new Vehicle(pickedVehicle, pickedLane)

            this.generatedVehicles.push(vehicle)

            console.log(`${pickedVehicle} taking lane ${pickedLane.id}`)
        }
        
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

    startMovingVehicles() {
        const update = () => {
            this.updateVehicle()
            requestAnimationFrame(update)
        }

        requestAnimationFrame(update)
    }

    updateVehicle() {
        this.generatedVehicles.forEach((vehicle, index) => {

            let vehicleInFront = null;

            if (index > 0 && this.generatedVehicles[index - 1].lane === vehicle.lane) {
                vehicleInFront = this.generatedVehicles[index - 1];
            }

            vehicle.move(vehicleInFront);

            // To Determine .lane width to set the end point as terminator to remove car object form the somulation
            const laneWidth = vehicle.lane.clientWidth;

            if (vehicle.xPos > laneWidth) {
                this.terminateVehicle(index)
            }
        })
    }

    terminateVehicle(index) {
        const vehicleElement = this.generatedVehicles[index].vehicleContainerElement;
        vehicleElement.remove();

        this.generatedVehicles.splice(index, 1);
        console.log('Vehicle remove from the Simulation: Terminated')
    }

    startGeneration() {
        const timeInterval = this.adjustTimeInterval()
        console.log(timeInterval,'Seconds')

        let lastGenerationVehicle = performance.now()

        const generateVehicles = (currentTime) => {
            if (currentTime - lastGenerationVehicle >= timeInterval && this.generatedVehicles.length < this.maxVehicle) {
                this.generate()
                lastGenerationVehicle = currentTime
            }
            requestAnimationFrame(generateVehicles)
        };
       requestAnimationFrame(generateVehicles)
    }
}

// if (require.main === module) {
//     const generator = new GenerateVehicle(0.1, [1,2,3,4,5,6,7,8]) // Btw this lane is a crossing , each sides have 2 lanes
//     generator.startGeneration()
// }

// module.exports = { Vehicle }