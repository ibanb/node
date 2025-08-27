const { parentPort, workerData } = require('worker_threads');
const computeMulti = require('./compute');

parentPort.postMessage(computeMulti(workerData))