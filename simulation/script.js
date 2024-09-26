import { GenerateVehicle } from "./vehicles/vehicle.js"
import { Lane, TrafficLight } from "./lanes/trafficLight.js"

const lanes = []

const mainMap = document.getElementById('map')

const createLanes = (numOfLanes, startingLaneNum, startingCrossingNum) => {
    let startingLane = startingLaneNum
    for (let laneNum = 1; laneNum <= numOfLanes; laneNum++) {
        console.log(`Road-${startingLane} has been Created`)
        lanes.push(new Lane(mainMap, `lane${startingLane}`,2, startingCrossingNum))
        startingLane++
    }
}

const startSimulation = () => {
    const generate = new GenerateVehicle(0.1, lanes, 10)
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


// startSimulation()


