const shell = require('shelljs');
const {appendHosts} = require('./append-hosts');

const bootMaster = (clusterInfo) => {
    console.info(`[Node ${clusterInfo.master}]`);
    console.info('【Stage 1】Update /etc/hosts');
    appendHosts(clusterInfo);
    console.info('【Stage 2】Setup common tools');
    shell.exec('sh -C bash/bootstrap.sh');
    console.info('【Stage 3】Setup master')
    shell.exec(`sh -C bash/bootstrap_kmaster.sh ${clusterInfo.master.ip}`);
};

module.exports = {bootMaster};