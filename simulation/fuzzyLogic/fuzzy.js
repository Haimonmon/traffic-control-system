/**
 *  ? Membership Functions for the traffic Density
 *  * Inputs: Light Density, Medium Density, High Density
 *  * Outputs: green Light Duration
 */

// ? Each Functions are represented as Triangular as 0 will be the starting point then 1 will be the peak point, the end point is 0 again
// * For Traffic Density Membership Functions
const lightTrafficDensity = (inputDensity, triangle) => {
    if (inputDensity <= triangle.startingPoint) return 1;
    if (inputDensity > triangle.startingPoint && inputDensity <= triangle.peakPoint) return (triangle.peakPoint - inputDensity) / (triangle.peakPoint - triangle.startingPoint);
    return 0;
}

const mediumTrafficDensity = (inputDensity, triangle) => {
    if (inputDensity <= triangle.startingPoint || inputDensity >= triangle.endPoint) return 0;
    if (inputDensity > triangle.startingPoint && inputDensity <= triangle.peakPoint) return (inputDensity - triangle.startingPoint) / (triangle.peakPoint - triangle.startingPoint);
    if (inputDensity > triangle.peakPoint && inputDensity <= triangle.endPoint) return (triangle.endPoint - inputDensity) / (triangle.endPoint - triangle.peakPoint);
    return 0;
}

const heavyTrafficDensity = (inputDensity, triangle) => {
    if (inputDensity <= triangle.startingPoint) return 0;
    if (inputDensity > triangle.startingPoint && inputDensity <= triangle.peakPoint) return (inputDensity - triangle.startingPoint) / (triangle.peakPoint - triangle.startingPoint);
    return 1;
}


// * For Waiting time MemberShip Function
const shortWaitingTime = (inputWaitingTime, triangle) => {
    if (inputWaitingTime <= triangle.startingPoint) return 1;
    if (inputWaitingTime > triangle.startingPoint && inputWaitingTime <= triangle.peakPoint) return (triangle.peakPoint - inputWaitingTime) / (triangle.peakPoint - triangle.startingPoint);
    return 0;
}

const mediumWaitingTime = (inputWaitingTime, triangle) => {
    if (inputWaitingTime <= triangle.startingPoint || inputWaitingTime >= triangle.endPoint) return 0;
    if (inputWaitingTime > triangle.startingPoint && inputWaitingTime <= triangle.peakPoint) return (inputWaitingTime - triangle.startingPoint) / (triangle.peakPoint - triangle.startingPoint);
    if (inputWaitingTime > triangle.peakPoint && inputWaitingTime <= triangle.endPoint) return (triangle.endPoint - inputWaitingTime) / (triangle.endPoint - triangle.peakPoint);
    return 0;
}

const longWaitingTime = (inputWaitingTime, triangle) => {
    if (inputWaitingTime <= triangle.startingPoint) return 0;
    if (inputWaitingTime > triangle.startingPoint && inputWaitingTime <= triangle.peakPoint) return (inputWaitingTime - triangle.startingPoint) / (triangle.peakPoint - triangle.startingPoint);
    return 1;
}

const densityTriangleInputs = () => {
    return {
        'lightDensityTriangleInputs': triangleInputs(10, 20, 0),
        'mediumDensityTriangleInputs': triangleInputs(10, 20, 30),
        'heavyDensityTriangleInputs': triangleInputs(20, 30, 40)
    }
}

const timeTriangleInputs = () => {
    return {
        'shortWaitingTriangleInputs': triangleInputs(0, 5, 10),
        'mediumWaitingTriangleInputs': triangleInputs(5, 10, 15),
        'longWaitingTriangleInputs': triangleInputs(10, 15, 20)
    }
}

/**
 * Convert crisp inputs or values into fuzzy values to tell the traffic density and waiting times, into percentages
 * @param {*} trafficDensity 
 * @param {*} waitingTime 
 */
const fuzzification = (trafficDensity, trafficDensityTriangle, waitingTime, waitingTimeTriangle) => {
    
    const density = {
        "lightDensity": lightTrafficDensity(trafficDensity, trafficDensityTriangle.lightDensityTriangleInputs),
        "mediumDensity": mediumTrafficDensity(trafficDensity, trafficDensityTriangle.mediumDensityTriangleInputs),
        "heavyDensity": heavyTrafficDensity(trafficDensity, trafficDensityTriangle.heavyDensityTriangleInputs)
    };

    const times = {
        "shortTime": shortWaitingTime(waitingTime, waitingTimeTriangle.shortWaitingTriangleInputs),
        "mediumTime": mediumWaitingTime(waitingTime, waitingTimeTriangle.mediumWaitingTriangleInputs),
        "longTime": longWaitingTime(waitingTime, waitingTimeTriangle.longWaitingTriangleInputs)
    };

    return { traffic: density , waiting: times };
}

/**
 * IF TRAFFIC DENSITY IS HIGH and WAITING TIME IS LONG = ` should have long green light duration `
 * 
 * IF TRAFFIC DENSITY IS MEDIUM and WAITING TIME IS MEDIUM = ` should have a not long but half of the second time or green light duration`
 * 
 * IF TRAFFIC DESNITY IS LOW and WAITING TIME IS SHORT = ` should have a very short green light duration `
 * 
 * @param {*} traffic traffic density in a triangular graph
 * @param {*} waiting waiting times in a triangular graph
 * @returns 
 */
const applyFuzzyRuleSets = (traffic, waiting) => {
    console.log(traffic)
    console.log(waiting)

    if (traffic.heavyDensity > 0 && waiting.longTime > 0) {
        return "long";
    } else if (traffic.mediumDensity > 0 && waiting.mediumTime > 0 ) {
        return "medium";
    } else {
        return "short";
    }
}

/**
 * Passing the ` applyFuzzyRuleSets function ` as an argument to return as crisp value of green light durations
 * @param {*} output Applying rule sets output conditions
 * @returns 
 */
const defuzzify = (output) => {
    if (output === 'long') return 60;
    if (output === 'medium') return 30;
    return 15; // for short
}

/**
 * Factory Function or Object Factory Function
 * @param {number} valueA 
 * @param {number} valueB 
 * @param {number} valueC 
 * @returns 
 */
const triangleInputs = (valueA, valueB, valueC) => {
    return {
        'startingPoint': valueA,
        'peakPoint': valueB,
        'endPoint': valueC
    }
}

/**
 *  Performs all the Fuzy logic in just one Function
 * @param {*} trafficDensity the number of vehicles in a lane
 * @param {*} averageWaitingTime the waiting time of all the vehicles in the lane
 * @returns
 */
const fuzzyy = (trafficDensity, averageWaitingTime) => {
    // TODO: Apply this on Dom for customized fuzzy logic
    const trafficDensityTriangle = densityTriangleInputs()
    const waitingTimeTriangle = timeTriangleInputs()

    const fuzzyValues = fuzzification(trafficDensity, trafficDensityTriangle, averageWaitingTime, waitingTimeTriangle);

    const fuzzyTrafficDensity = fuzzyValues.traffic;
    const fuzzyWaitingTime = fuzzyValues.waiting;

    // * Rule sets as outputs
    const ruleSets = applyFuzzyRuleSets(fuzzyTrafficDensity, fuzzyWaitingTime);

    console.log(ruleSets)

    const crispDurationValue = defuzzify(ruleSets);

    return crispDurationValue;
}

if (require.main === module) {
    let trafficDensity = 50;
    let waitingTime = 22;

    const fuzzyLogic = fuzzyy(trafficDensity, waitingTime);

    console.log(fuzzyLogic);
}

module.exports = { fuzzyy }
/**
 * ? Reference:
 * * PDF File: https://www.researchgate.net/profile/Mohamed-Mourad-Lafifi/post/How_do_I_interprete_the_output_of_fuzzy_logic_inference_engine_for_traffic_signal_control/attachment/59d645cf79197b80779a0e25/AS%3A454775935377409%401485438440658/download/Fuzzy+Traffic+Control+System.pdf
 * * https://www.scirp.org/journal/paperinformation?paperid=102081#:~:text=A%20membership%20function%20for%20a,0%20and%201%20%5B13%5D.
 * * https://youtu.be/OssY5pzOyo0?si=jcAMtjW4CxaWYX0z - Traffic control system
 * * https://www.mathworks.com/help/fuzzy/trimf.html - Membership Formula
 * ? For the full documentation i will submit the full Referene on Github Readme to make the right Credits to the owner of the Project Research
 */