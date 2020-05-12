console.log('=============This is post log===================');
const core = require('@actions/core');

var pid = core.getState("pidToKill");

console.log(`Action state result:${pid}`);