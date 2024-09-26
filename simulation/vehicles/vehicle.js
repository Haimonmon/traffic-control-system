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
    /**
     * 
     * @param {*} vehicleType 
     * @param {*} lane 
     * @param {*} stopPos Traffic Light Positions 275 for x on traffic lights then 180 y for verticals
     */
    constructor(vehicleType, lane, stopPos = {x:275, y:null}) {
        // Default xPos will serve as the starting point of spawning
        this.arrivalTime = Date.now()
        this.waitingTime = 0
        this.lane = lane
        this.vehicleType = vehicleType

        this.directionIs = {
            pointInEastBound: this.lane.laneDirection === 'east-bound',
            pointInWestBound: this.lane.laneDirection === 'west-bound',
            pointInNorthBound: this.lane.laneDirection === 'north-bound',
            pointInSouthBound: this.lane.laneDirection === 'south-bound'
        }

        this.xPos = this.setStartingPositionX();
        this.yPos = this.setStartingPositionY();
        this.speed = 5

        this.stopPos = stopPos

        //create DOM element:
        this.vehicleContainerElement = document.createElement('div')
        this.vehicleContainerElement.classList.add('vehicle')
        this.vehicleContainerElement.classList.add(vehicleType)

        this.vehicleDegree = this.moveDirection()
        this.vehicleContainerElement.style.transform = `rotate(${this.vehicleDegree}deg)`;

        this.imgVehicleElement = document.createElement('img')
        this.imgVehicleElement.src = this.setVehicleImage(vehicleType)
        this.imgVehicleElement.alt = vehicleType

        this.vehicleContainerElement.appendChild(this.imgVehicleElement)

        this.lane.laneElement.appendChild(this.vehicleContainerElement)
    }

    setStartingPositionX() {
        if (this.directionIs.pointInWestBound || this.directionIs.pointInEastBound) return -100;
        if (this.directionIs.pointInNorthBound || this.directionIs.pointInSouthBound) return 20;
    }

    setStartingPositionY() {
        if (this.directionIs.pointInWestBound || this.directionIs.pointInEastBound) return 10;
        if (this.directionIs.pointInNorthBound || this.directionIs.pointInSouthBound) return -100;
    }

    moveDirection() {
        if (this.directionIs.pointInWestBound) {
            this.vehicleContainerElement.style.left = `${this.xPos}px`
            this.vehicleContainerElement.style.top = `${this.yPos}px`
            return 90
        }

        if (this.directionIs.pointInEastBound) {
            this.vehicleContainerElement.style.right = `${this.xPos}px`
            this.vehicleContainerElement.style.top = `${this.yPos}px`
            return -90
        }

        if (this.directionIs.pointInNorthBound) {
            this.vehicleContainerElement.style.top = `${this.yPos}px`
            this.vehicleContainerElement.style.left = `${this.xPos}px`
            return 180
        }

        if (this.directionIs.pointInSouthBound) {
            this.vehicleContainerElement.style.bottom = `${this.yPos}px`
            this.vehicleContainerElement.style.left = `${this.xPos}px`
            return 0
        }
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

    checkVehicleInFront() {
        let vehicleInFront = null;

        // if (index > 0 && this.generatedVehicles[index - 1].lane === vehicle.lane) {
        //     vehicleInFront = this.generatedVehicles[index - 1];
        // }

        const listOfVehiclesInLane = this.lane.laneInVehicle

        for (let i = 0; i < listOfVehiclesInLane.length; i++) {
           
            const otherVehicle = listOfVehiclesInLane[i - 1]

            if(otherVehicle === this) {
                continue;
            }

            if (i > 0 && otherVehicle.lane === this.lane && this.isVehicleInFront(otherVehicle)) {
                //this.monitor('lane1')
                vehicleInFront = otherVehicle
                break;
            }
        }
        return vehicleInFront
    }

    monitor(laneName) {
        if (this.lane.laneIdName === laneName) {
            console.log(this.speed, this.lane.laneIdName)
            if (!(this.xPos >= this.stopPos.x)) {
                console.log(this.lane.laneInVehicle)
                console.log(this.xPos >= this.stopPos.x)
                console.log(this.xPos, '>=', this.stopPos.x)
            } 
        }
    }

    move() {
        let vehicleInFront = this.checkVehicleInFront()

        if (this.lane.laneInVehicle.length > 4) {
            this.stopPos.x = null
        }

        if (vehicleInFront && this.isVehicleInFront(vehicleInFront)) {
            this.stop()
        }

        //this.monitor('lane2')
        //this.monitor('lane1')
        // * HORIZONTAL MOVEMENTS
        if (this.stopPos.x !== null && (this.directionIs.pointInWestBound || this.directionIs.pointInEastBound)) {
            this.xPos += this.speed;
            this.moveDirection()

            if (this.xPos >= this.stopPos.x) {
                this.stop()
            }
            return
        }

        // * VERTICAL MOVEMENTS
        if (this.stopPos.y !== null && (this.directionIs.pointInNorthBound || this.directionIs.pointInSouthBound)) {
            this.yPos += this.speed;
            this.moveDirection()

            if (this.yPos >= this.stopPos.y) {
                this.stop();
            }

            return
        }

        // console.log(this.lane.laneInVehicle)
        // console.log(this.speed === 0)
        
        if (this.speed === 0 && this.stopPos.x === null) {
            this.speed = 5;
        }

        if (this.directionIs.pointInWestBound || this.directionIs.pointInEastBound) {
            this.xPos += this.speed; // * Horizontal Movements
        }

        if (this.directionIs.pointInNorthBound || this.directionIs.pointInSouthBound) {
            this.yPos += this.speed // * Vertical Movements
        }
            
        this.moveDirection()
        
        
    }

    stop() {
        this.speed = 0
    }

    isVehicleInFront(vehicleInFront, safeDistance = 17) {
        // 50 gap between vehicle

        const currentVehicleLeft = this.xPos;
        const currentVehicleRight = this.xPos + this.vehicleContainerElement.offsetHeight;
        
        const vehicleInFrontLeft = vehicleInFront.xPos;
        const vehicleInFrontRight = vehicleInFront.xPos + vehicleInFront.vehicleContainerElement.offsetHeight;

        // const distance = currentVehicleRight - vehicleInFrontLeft // ! Horizontal testing

        if (this.directionIs.pointInWestBound || this.directionIs.pointInEastBound) {
            // console.log(this.lane.laneInVehicle.length)
            const distance = (vehicleInFront.xPos - vehicleInFront.vehicleContainerElement.offsetHeight) - safeDistance

            return distance < this.xPos;
        }

        if (this.directionIs.pointInNorthBound || this.directionIs.pointInSouthBound) {
            const distance = (vehicleInFront.yPos - vehicleInFront.vehicleContainerElement.offsetHeight) - safeDistance

            return distance < this.yPos
        }
        
    }
}

/**
 * Generates a vehicle
 */
export class GenerateVehicle {
    /**
     * 
     * @param {*} trafficVolume vehicle amount in terms of events
     * @param {*} lanes 
     * @param {*} maxVehicle 
     */
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
            pickedLane.addVehicleInLane(vehicle)

            console.log(`${pickedVehicle} taking lane ${pickedLane.laneIdName}`)
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
        }

        update()
    }

    async updateVehicle() {
        const movePromise = this.generatedVehicles.map((vehicle) => {
            return new Promise((resolve) => {

                vehicle.move()

                resolve(vehicle)
            });
        });

        const movingVehicles = await Promise.all(movePromise)

        movingVehicles.forEach((vehicle) => {
            const laneWidth = vehicle.lane.laneElement.clientWidth;
            const laneHeight = vehicle.lane.laneElement.clientHeight;

            
            if (vehicle.vehicleDegree === 90 || vehicle.vehicleDegree === -90) {
                if (vehicle.xPos > laneWidth ) {
                    this.terminateVehicle(this.generatedVehicles.indexOf(vehicle));
                }
            } else {
                if (vehicle.yPos > laneHeight ) {
                    this.terminateVehicle(this.generatedVehicles.indexOf(vehicle));
                }
            }
        });
    }

    terminateVehicle(index) {
        const vehicleElement = this.generatedVehicles[index];
        vehicleElement.vehicleContainerElement.remove();

        this.generatedVehicles.splice(index, 1);

        const indexInLane = vehicleElement.lane.laneInVehicle.indexOf(vehicleElement);

        vehicleElement.lane.terminateVehicleInLane(indexInLane)

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

            this.startMovingVehicles()
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

// !The porblem your car is not stopping due to generatedVehicle, Remember you have a list or a class of ` new Lane() `