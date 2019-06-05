const _ = require('lodash');
const fs = require('fs');
const shell = require('shelljs');
const {globalV} = require('./global-variables');

const createHostsBash = (clusterInfo) => {
    let data = '#!/bin/bash\n' +
        '# Update hosts file\n' +
        'echo "[TASK 1] Update /etc/hosts file"\n' +
        'cat >>/etc/hosts<<EOF\n' +
        '<%= master.ip %> <%= master.host %>.<%= domain %> <%= master.host %>\n' +
        '<% _.forEach(workers, function(worker) { print(worker.ip+" "+worker.host+"."+domain+" "+worker.host+"\\n") }); %>' +
        'EOF'

    let compiled = _.template(data);
    let content = compiled(clusterInfo);
    shell.rm(globalV.updateHostsPath);
    fs.appendFileSync(globalV.updateHostsPath, content);
};

module.exports = {createHostsBash};
