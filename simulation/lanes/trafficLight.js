// const { fuzzyy } = require('../fuzzyLogic/fuzzy.js')

export class Lane {
    /**
     * @param {*} map ! DOM id element of the main Map, < This is Important >
     * @param {*} laneIdName Name of the lane 
     * @param {*} numOfPedestrianCrossing Amount of Crossing creating
     * @param {*} startingCrossingNum Starting Numbering of the crossing for the className of the element
     */
    constructor(map, laneIdName, numOfPedestrianCrossing, startingCrossingNum) {
        this.laneInVehicle = []
        this.numOfPedestrianCrossing = numOfPedestrianCrossing
        this.startingCrossingNum = startingCrossingNum
        this.laneIdName = laneIdName

        this.laneElement = document.getElementById(laneIdName)
        this.laneDirection = this.laneElement.classList[1];
        
        // this.laneElement = document.createElement('div')
        // this.laneElement.classList.add('road')
        // this.laneElement.id = laneIdName
        // this.createPedestrianCrossingElement()

        // map.appendChild(this.laneElement)
    }

    addVehicleInLane(vehicle) {
        this.laneInVehicle.push(vehicle)
    }

    createPedestrianCrossingElement() {
        for (let crossing = 1; crossing <= this.numOfPedestrianCrossing; crossing++) {
            const crossingElement = document.createElement('div')
            crossingElement.classList.add(`pedestrian-crossing${this.startingCrossingNum}`)
            this.startingCrossingNum++
            this.laneElement.appendChild(crossingElement)
        }
    }

    printVehicleInLane() {
        console.log(this.laneInVehicle)
    }

    terminateVehicleInLane(index) {
        this.laneInVehicle.splice(index, 1)
    }
}


export class TrafficLight {
    /**
     * 
     * @param {*} laneHandle lane where the traffic light is on Position
     * @param {*} position coordinates of Traffic light on the lane
     */
    constructor(laneHandle, position) {
        // this.redLight = false
        // this.amberLight = false
        // this.greenLight = false
        this.light = null;
        this.position = position
        this.laneHandle = laneHandle

        // Create element traffic light for a container
        this.trafficLightElement = document.createElement('div')
        this.trafficLightElement.classList.add('traffic-light')
        this.trafficLightElement.classList.add('red-light')

        this.trafficLightElement.style.left = `${position.x}px`
        this.trafficLightElement.style.top = `${position.y}px`

        this.laneHandle.appendChild(this.trafficLightElement)
    }

    updateWaitingTimeOfVehicles() {
        this.vehicles.forEach(vehicle => vehicle.updateWaitingTime());
    }

    handleLightDuration() {
        const totalWaitingTime = this.vehicles.reduce((total, vehicle) => total + vehicle.waitingTime, 0);
        const averageWaitingTime = totalWaitingTime / this.vehicles.length
        const trafficDensity = this.vehicles.length
        // const fuzzyLogic = fuzzyy(trafficDensity, averageWaitingTime);
    }

    printList() {
        console.log(this.vehicles)
    }
}

// TODO: Needed for waiting times of each vehicle in lanes
// setInterval()
// * also if the light countdown comes to an near end of 5 seconds, it will start to compute the total duration of the green light

// if (require.main === module) {
//     const trafficLight = new TrafficLightSystem()

//     const vehicle1 = new Vehicle()
//     const vehicle2 = new Vehicle()
//     const vehicle3 = new Vehicle()
//     const vehicle4 = new Vehicle()
    
//     trafficLight.addDetectedVehicle(vehicle1)
//     trafficLight.addDetectedVehicle(vehicle2)
//     trafficLight.addDetectedVehicle(vehicle3)
//     trafficLight.addDetectedVehicle(vehicle4)

//     setInterval(() => {
//         trafficLight.updateWaitingTimeOfVehicles()
//         console.log('Updating waiting time')
//         trafficLight.printList()
//     },1000)
// }