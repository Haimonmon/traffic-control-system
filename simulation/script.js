import { GenerateVehicle } from "./vehicles/vehicle.js"


const lanes = []

const lane1 = document.getElementById('lane1')
const lane2 = document.getElementById('lane2')
lanes.push(lane1)
lanes.push(lane2)


const startSimulation = () => {
    const generate = new GenerateVehicle(0.9, lanes, 5)
    generate.startGeneration()
    generate.startMovingVehicles()
}

// startSimulation()
