import { GenerateVehicle } from "./vehicles/vehicle.js"
import { Lane, TrafficLight, TrafficLightSystem } from "./lanes/trafficLight.js"

const lanes = [] // Should be 2,3,1,4
const trafficLights = []

const mainMap = document.getElementById('map')

const createLanes = (numOfLanes, startingLaneNum, startingCrossingNum) => {
    let startingLane = startingLaneNum
    for (let laneNum = 1; laneNum <= numOfLanes; laneNum++) {
        console.log(`Road-${startingLane} has been Created`)
        const createdLane = new Lane(mainMap, `lane${startingLane}`,2, startingCrossingNum);
        const createdTrafficLight = new TrafficLight(createdLane, `traffic-light${startingLane}`);
        trafficLights.push(createdTrafficLight)
        createdLane.addTrafficLight(createdTrafficLight)
        lanes.push(createdLane)
        startingLane++
    }
}

const readyTrafficLights = () => {
    for (let lane of lanes) {
        lane.trafficLight.setPositionOfTrafficLight()
        lane.trafficLight.addLanes(lanes)
    }
}

const startSimulation = () => {
    const generate = new GenerateVehicle(0.1, lanes, 10)
    const trafficLightSystem = new TrafficLightSystem(trafficLights)
    trafficLightSystem.activateTrafficLightSystem()
    generate.startGeneration()
}

// Lane 1 and Lane 2 that the Pedestrian Crossing starts at 1, so each lanes will have a child of:
// class='pedestrian-crossing1' and class='pedestrian-crossing2' as each names have their numbering 
const numOfLanesInRoad1 = 2
const startingLaneNumInRoad1 = 1
const startingCrossingNumberInRoad1 = 1
createLanes(numOfLanesInRoad1, startingLaneNumInRoad1, startingCrossingNumberInRoad1)

const numOfLanesInRoad2 = 2
const startingLaneNumInRoad2 = 3
const startingCrossingNumberInRoad2 = 3
createLanes(numOfLanesInRoad2, startingLaneNumInRoad2, startingCrossingNumberInRoad2)

const orderedTrafficLights = [trafficLights[1], trafficLights[2], trafficLights[0], trafficLights[3]];

trafficLights.length = 0
trafficLights.push(...orderedTrafficLights)

readyTrafficLights()

console.log(lanes)
startSimulation()


