const path = require('path');
const globalV = {
    moduleHome: path.dirname(require.resolve('.')),
    updateHostsPathOrg: '/tmp/update_hosts_org.sh',
    updateHostsPathDest: '/tmp/update_hosts.sh',
    bootstrapPathOrg: path.dirname(require.resolve('.'))+`/bash/bootstrap.sh`,
    bootstrapPathDest: '/tmp/bootstrap.sh',
    bootMasterPathOrg: path.dirname(require.resolve('.'))+`/bash/bootstrap_master.sh`,
    bootMasterPathDest: '/tmp/bootstrap_master.sh',
    bootWorkerPathOrg: path.dirname(require.resolve('.'))+`/bash/bootstrap_worker.sh`,
    bootWorkerPathDest: '/tmp/bootstrap_worker.sh',
    flannelOrg: 'bash/kube-flannel.yaml',
    flannelDest: '/tmp/kube-flannel.yaml'
};

module.exports = {globalV};