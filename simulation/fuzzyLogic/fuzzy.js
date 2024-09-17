/**
 *  ? Membership Functions for the traffic Density
 *  * Inputs: Light Density, Medium Density, High Density
 *  * Outputs: green Light Duration
 */

// ? Each Functions are represented as Triangular as 0 will be the starting point then 1 will be the peak point, the end point is 0 again
// * For Traffic Density Membership Functions
const lightTrafficDensity = (inputDensity) => {
    if (inputDensity <= 10) return 1;
    if (inputDensity > 10 && inputDensity <=20) return (20 - inputDensity) / 10;
    return 0;
}

const mediumTrafficDensity = (inputDensity) => {
    if (inputDensity <= 10 || inputDensity >= 30) return 0;
    if (inputDensity > 10 && inputDensity <= 20) return (inputDensity - 10) / 10;
    if (inputDensity > 20 && inputDensity <= 30) return (30 - inputDensity) / 10;
    return 0;
}

const heavyTrafficDensity = (inputDensity) => {
    if (inputDensity <= 20) return 0;
    if (inputDensity > 20 && inputDensity <= 30) return (inputDensity - 20) / 10;
    return 1;
}


// * For Waiting time MemberShip Function 
const shortWaitingTime = (inputWaitingTime) => {
    if (inputWaitingTime <= 5) return 1;
    if (inputWaitingTime > 5 && inputWaitingTime <= 10) return (10 - inputWaitingTime) / 5;
    return 0;
}

const mediumWaitingTime = (inputWaitingTime) => {
    if (inputWaitingTime <= 5 || inputWaitingTime >= 15) return 0;
    if (inputWaitingTime > 5 && inputWaitingTime <= 10) return (inputWaitingTime - 5) / 5;
    if (inputWaitingTime > 10 && inputWaitingTime <= 15) return (15 - inputWaitingTime) / 5;
    return 0;
}

const longWaitingTime = (inputWaitingTime) => {
    if (inputWaitingTime <= 10) return 0;
    if (inputWaitingTime > 10 && inputWaitingTime <= 15) return (inputWaitingTime - 10) / 5;
    return 1;
}

/**
 * Convert crisp inputs or values into fuzzy values to tell the traffic density and waiting times, into percentages
 * @param {*} trafficDensity 
 * @param {*} waitingTime 
 */
const fuzzification = (trafficDensity, waitingTime) => {
    const density = {
        "lightDensity": lightTrafficDensity(trafficDensity),
        "mediumDensity": mediumTrafficDensity(trafficDensity),
        "heavyDensity": heavyTrafficDensity(trafficDensity)
    };

    const times = {
        "shortTime": shortWaitingTime(waitingTime),
        "mediumTime": mediumWaitingTime(waitingTime),
        "longTime": longWaitingTime(waitingTime)
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
    if (traffic.heavyDensity > 0 && waiting.longTime > 0) {
        return "long";
    } else if (traffic.mediumDensity > 0 && waiting.mediumWaitingTime > 0 ) {
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
 *  Performs all the Fuzy logic in just one Function
 * @param {*} trafficDensity the number of vehicles in a lane
 * @param {*} averageWaitingTime the waiting time of all the vehicles in the lane
 * @returns 
 */
const fuzzyy = (trafficDensity, averageWaitingTime) => {
    const fuzzyValues = fuzzification(trafficDensity, averageWaitingTime);

    const fuzzyTrafficDensity = fuzzyValues.traffic;
    const fuzzyWaitingTime = fuzzyValues.waiting;


    // * Rule sets as outputs
    const ruleSets = applyFuzzyRuleSets(fuzzyTrafficDensity, fuzzyWaitingTime);

    const crispDurationValue = defuzzify(ruleSets);

    return crispDurationValue;
}

if (require.main === module) {
    let trafficDensity = 900;
    let waitingTime = 200;

    const fuzzyLogic = fuzzyy(trafficDensity, waitingTime);

    console.log(fuzzyLogic);
}

module.exports = { fuzzyy }
/**
 * ? Reference:
 * * PDF File: https://www.researchgate.net/profile/Mohamed-Mourad-Lafifi/post/How_do_I_interprete_the_output_of_fuzzy_logic_inference_engine_for_traffic_signal_control/attachment/59d645cf79197b80779a0e25/AS%3A454775935377409%401485438440658/download/Fuzzy+Traffic+Control+System.pdf
 * * https://www.scirp.org/journal/paperinformation?paperid=102081#:~:text=A%20membership%20function%20for%20a,0%20and%201%20%5B13%5D.
 * * https://youtu.be/OssY5pzOyo0?si=jcAMtjW4CxaWYX0z - Traffic control system
 * ? For the full documentation i will submit the full Referene on Github Readme to make the right Credits to the owner of the Project Research
 */