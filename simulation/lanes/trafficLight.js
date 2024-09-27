import { fuzzyy } from '../fuzzyLogic/fuzzy.js'

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
        this.laneIdName = laneIdName;
        this.trafficLight = null; // * Traffic Light Class

        this.laneElement = document.getElementById(laneIdName)
        this.laneDirection = this.laneElement.classList[1];
        
        // this.laneElement = document.createElement('div')
        // this.laneElement.classList.add('road')
        // this.laneElement.id = laneIdName
        // this.createPedestrianCrossingElement()

        // map.appendChild(this.laneElement)
    }

    addTrafficLight(trafficLight) {
        this.trafficLight = trafficLight
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
    constructor(laneHandle, trafficLightElementName) {
        this.redLight = true
        this.amberLight = false
        this.greenLight = false
        
        this.lanes = null; // * Array of all lanes

        this.light = null;
        this.position = null; // * Needs to be object {}
        this.laneHandle = laneHandle

        this.redDuration = 15
        this.amberDuration = 5
        this.greenDuration = 5;

        this.currentCount = this.redDuration

        // Create element traffic light for a container
        this.trafficLightElementName = trafficLightElementName
        this.trafficLightElement = null;

        // this.trafficLightElement = document.createElement('div')
        // this.trafficLightElement.classList.add('traffic-light')
        // this.trafficLightElement.classList.add('red-light')

        // this.laneHandle.appendChild(this.trafficLightElement)
    }

    addLanes(listOfLanes) {
        this.lanes = listOfLanes
    }

    setTrafficLightStatus() {
        this.trafficLightElement = document.getElementById(this.trafficLightElementName);

        // * Update class name based on current light status
        if (this.redLight) {
            this.trafficLightElement.className = 'red-light';
        } else if (this.amberLight) {
            this.trafficLightElement.className = 'amber-light';
        } else if (this.greenLight) {
            this.trafficLightElement.className = 'green-light';
        }
    }

    startTrafficLightCycle() {
        this.redLight = true;
        this.currentCount = this.redDuration; // Reset countdown
        this.setTrafficLightStatus();
        this.startCountdown();
    }
    
    startCountdown() {
        const countdownInterval = setInterval(() => {
            this.currentCount--;
          
            if (this.redLight) {
                if (this.currentCount === 5) {
                    this.greenDuration = this.handleLightDuration()
                }

                if (this.currentCount <= 0) {
                    this.redLight = false;
                    this.greenLight = true; // Switch to green
                    this.currentCount = this.greenDuration; // * Reset countdown for green
                    this.setTrafficLightStatus();
                }
            } else if (this.greenLight) {
                if (this.currentCount <= 0) {
                    this.greenLight = false;
                    this.amberLight = true; // Switch to amber
                    this.currentCount = this.amberDuration; // TODO Reset countdown for amber
                    this.setTrafficLightStatus();
                }
            } else if (this.amberLight) {
                if (this.currentCount <= 0) {
                    this.amberLight = false;
                    this.redLight = true; // Switch back to red
                    this.currentCount = this.redDuration; // ! Reset countdown for red
                    this.setTrafficLightStatus();
                    clearInterval(countdownInterval);
                }
            }
        }, 1000);

    }

    /**
     * * This will set vehicle stop light positions
     */
    setPositionOfTrafficLight () {
        this.trafficLightElement = document.getElementById(this.trafficLightElementName)
        
        console.log(`Element: ${this.trafficLightElement.id} has been set to respective ${this.laneHandle.laneElement.id}`)

        if (this.laneHandle.laneElement.classList[1] === 'west-bound') {
            this.position = {x: 275, y:null}
            this.trafficLightElement.style.left = `${this.position.x}px`
        }

        if (this.laneHandle.laneElement.classList[1] === 'east-bound') {
            this.position = {x: 275, y:null}
            this.trafficLightElement.style.right = `${this.position.x}px`
        }

        if (this.laneHandle.laneElement.classList[1] === 'south-bound') {
            this.position = {x: null, y:140}
            this.trafficLightElement.style.bottom = `${this.position.y}px`
        }

        if (this.laneHandle.laneElement.classList[1] === 'north-bound') {
            this.position = {x: null, y:140}
            this.trafficLightElement.style.top = `${this.position.y}px`
        }

        this.setTrafficLightStatus()
    }

    lightGreen() {
        this.redLight = false
        this.amberLight = false
        this.greenLight = true
    }

    lightRed() {
        this.redLight = true
        this.amberLight = false
        this.greenLight = false
    }

    lightAmber() {
        this.redLight = false
        this.amberLight = true
        this.greenLight = false
    }

    updateWaitingTimeOfVehicles() {
        this.vehicles.forEach(vehicle => vehicle.updateWaitingTime());
    }

    handleLightDuration() {
        const totalWaitingTime = this.laneHandle.laneInVehicle.reduce((total, vehicle) => total + vehicle.waitingTime, 0);
        const averageWaitingTime = totalWaitingTime / this.laneHandle.laneInVehicle.length
        const trafficDensity = this.laneHandle.laneInVehicle.length
        const fuzzyLogic = fuzzyy(trafficDensity, averageWaitingTime) || 15;

        return fuzzyLogic
    }

    printList() {
        console.log(this.vehicles)
    }
}


export class TrafficLightSystem {
    constructor(trafficLights) {
        this.trafficLights = trafficLights // * Array of Traffic lIGHTS
        this.currentIndex = 0
    }

    updateTrafficLights() {
        if (this.currentIndex === 0) {
            this.startTrafficLightCountdown(this.currentIndex)
        }

        setInterval(() => {
            const currentTrafficLight = this.trafficLights[this.currentIndex]
            
            if (currentTrafficLight.greenLight && currentTrafficLight.currentCount <= 15) {
                // * Move to the next traffic light
                this.currentIndex += 1;
                
                // * If the current index exceeds the array, reset it or stop the interval
                if (this.currentIndex >= this.trafficLights.length) {
                    this.currentIndex = 0; // Reset to first light or handle it accordingly
                }
    
                // * Start countdown for the next traffic light
                this.startTrafficLightCountdown(this.currentIndex);
            }
            console.clear()
            console.log(currentTrafficLight.trafficLightElementName,'Current Index of the Traffic Light')
            console.log('currentCount:',currentTrafficLight.currentCount)
            
        },1000)
    }

    activateTrafficLightSystem() {
        this.updateTrafficLights()
    }

    startTrafficLightCountdown(index) {
        const currentLight = this.trafficLights[index]
        currentLight.startTrafficLightCycle()
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
// 