const {bootNode} = require('./boot-node');
const {createHostsBash} = require('./hosts-bash');

const setupCluster = (cluster) => {
    console.log(cluster);
    createHostsBash(cluster);
    bootNode(cluster.master, cluster.master, true, cluster.domain);
    cluster.workers.forEach((worker) => {
        bootNode(cluster.master, worker, false, cluster.domain);
    });
};

module.exports = {setupCluster};
