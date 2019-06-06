const {bootNode} = require('./boot-node');
const {clusterInfo} = require('./ClusterInfo');
const {createHostsBash} = require('./hosts-bash');

const {setupCluster} = require('./setup-cluster');
const shelljs = require('shelljs');

// bootNode(clusterInfo);

// createHostsBash(clusterInfo);

setupCluster(clusterInfo);
// console.log(pathToModule);