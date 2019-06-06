const shell = require('shelljs');
const {globalV} = require('./global-variables');

const bootNode = (master, node, isMaster, domain) => {
    cmd(node, 'hostnamectl set-hostname', node.host + '.' + domain);
    console.info(`【${node.host} Stage 1】Update /etc/hosts`);
    execOnRemote(node, globalV.updateHostsPathOrg, globalV.updateHostsPathDest);
    console.info(`【${node.host} Stage 2】Setup common tools`);
    execOnRemote(node, globalV.bootstrapPathOrg, globalV.bootstrapPathDest);
    if (isMaster) {
        console.info(`【${node.host} Stage 3】Setup master`);
        //scp flannel
        scp(node, globalV.flannelOrg, globalV.flannelDest);
        execOnRemote(node, globalV.bootMasterPathOrg, globalV.bootMasterPathDest, master.ip + ' ' + globalV.flannelDest);
    } else {
        console.info(`【${node.host} Stage 3】Setup Worker`);
        execOnRemote(node, globalV.bootWorkerPathOrg, globalV.bootWorkerPathDest, master.ip + ' ' + master.password);
    }
};

function execOnRemote(node, orgPath, destPath, args) {
    scp(node, orgPath, destPath);
    sh(node, destPath, args);
}

function scp(node, orgPath, destPath) {
    shell.exec(`sshpass -p${node.password} scp -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -P${node.port} ${orgPath} root@${node.ip}:${destPath}`);
}

function sh(node, scriptPath, args) {
    cmd(node, `sh -C ${scriptPath}`, args);
}

function cmd(node, cmd, args) {
    shell.exec(`sshpass -p${node.password} ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -P${node.port} root@${node.ip} ${cmd} ${args}`);
}

module.exports = {bootNode: bootNode};