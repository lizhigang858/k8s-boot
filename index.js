const program = require('commander');
const {prompt} = require('inquirer');
const {bootMaster} = require('./boot-master');
module.exports = () => {

    const qStart = [
        {
            type: 'confirm',
            name: 'start',
            message: 'Use this machine as master node?',
            default: true
        }
    ];

    let cluster = {};

    const qDomain = [
        {
            type: 'input',
            name: 'domain',
            message: 'Input domain name:',
            // default: `${_.trimEnd(shell.exec('hostname', {silent: true}), '\n')}`,
            validate: (value) => {
                let pass = value.match(/(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/g);
                if (pass) {
                    return true;
                } else {
                    return "Please input a valid domain name";
                }
            }
        }
    ];

    const qNode = [
        {
            type: 'input',
            name: 'ip',
            message: 'Input ip:'
        },
        {
            type: 'input',
            name: 'host',
            message: 'Input host name:'
        },
        {
            type: 'input',
            name: 'password',
            message: 'Input root password:'
        },
    ];

    const qAnotherWorker = [
        {
            type: 'confirm',
            name: 'anotherWorker',
            message: 'Add another worker?'
        }
    ];


    function start() {
        prompt(qStart).then(answer => {
            if (!answer) {
                process.exit(0);
            } else {
                inquireCluster();
            }
        })
    }

    function inquireCluster() {
        prompt(qDomain).then(answer => {
            cluster = answer;
            inquireWorker();
        });
    }

    function inquireMaster() {
        console.info("Please input master info");
        prompt(qNode).then(answer => {
            cluster.master = answer;
        });
    }

    function inquireWorker() {
        console.info("Please input worker info");
        cluster.worker = [];
        prompt(qNode).then(answer => {
            cluster.worker.push(answer);
            prompt(qAnotherWorker).then(answer => {
                if (answer.anotherWorker) {
                    inquireWorker();
                } else {
                    console.log(cluster);
                    bootMaster(cluster);
                }
            })
        });
    }


    program.version('1.0.0');


    program
        .command('boot')
        .description('Boot a k8s cluster')
        .action(() => {
            start();
            // console.log('hell');
        });
    program.parse(process.argv);

};