const os = require('os');
const fs = require('fs');

const appendHosts = (clusterInfo) => {
    let line = hostLine(clusterInfo.domain, clusterInfo.master);
    clusterInfo.workers.forEach((worker) => {
        line = line + hostLine(clusterInfo.domain, worker);
    });
    fs.appendFileSync('/etc/hosts', line);
};

function hostLine(domain, node) {
    return node.ip + ' ' + node.host + '.' + domain + ' ' + node.host + os.EOL;
}

module.exports = {appendHosts};

