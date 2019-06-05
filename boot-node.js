const shell = require('shelljs');
const {globalV} = require('./global-variables');

const bootNode = (node,isMaster) => {
    console.info('【Stage 1】Update /etc/hosts');
    shell.exec(`sshpass -p${node.password} scp -P${node.port} ${globalV.updateHostsPath} root@${node.id}:${globalV.updateHostsPath} `);
    shell.exec(`sshpass -p${node.password} ssh -P${node.port} root@${node.id} sh -C ${globalV.updateHostsPath}`);
    console.info('【Stage 2】Setup common tools');


    shell.exec('sh -C bash/bootstrap.sh ');
    console.info('【Stage 3】Setup master')
    shell.exec(`sh -C bash/bootstrap_kmaster.sh ${clusterInfo.master.ip}`);
};

module.exports = {bootMaster: bootNode};