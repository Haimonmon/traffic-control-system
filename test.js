// const vehicles = [
//     { waitingTime: 1200 },
//     { waitingTime: 900 },
//     { waitingTime: 2000 },
//     { waitingTime: 1010 }
// ];

// const totalWaitingTime = vehicles.reduce((total, vehicle) => total + vehicle.waitingTime, 0);
// const trafficDensity = vehicles.length;
// const averageWaitingTime = totalWaitingTime / trafficDensity;

// console.log("Total Waiting Time:", totalWaitingTime); // Output: 19
// console.log("Traffic Density:", trafficDensity);      // Output: 4
// console.log("Average Waiting Time:", averageWaitingTime); // Output: 4.75

function doSomething() {
    console.log('Doing something...');
    setTimeout(doSomething, 1000); // Call again after 1 second
}

doSomething(); // Start the process
