const {bootMaster} = require('./boot-node');
const {clusterInfo} = require('./ClusterInfo');
const {createHostsBash} = require('./hosts-bash');

// bootMaster(clusterInfo);

createHostsBash(clusterInfo);