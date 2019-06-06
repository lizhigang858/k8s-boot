const program = require('commander');
const {prompt} = require('inquirer');
const chalk = require('chalk');
// const figlet = require('figlet');
const {setupCluster} = require('./setup-cluster');

module.exports = () => {
    // console.log(figlet.textSync('Kubernetes Bootstrap!', {
    //     // font: 'Ghost',
    //     horizontalLayout: 'default',
    //     verticalLayout: 'default'
    // }));

    console.info("This application will help you setup a k8s cluster.");
    console.info("We need you to supply us with the node's informations on which you will install the cluster.");
    console.info(chalk.red("WARNING: We will turn off the firewall,SeLinux and swap on every node!"));

    let cluster = {};

    const qDomain = [
        {
            type: 'input',
            name: 'domain',
            message: 'Input domain name:',
            default: 'example.com',
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
            message: 'Input ip:',
            validate: (value) => {
                let pass = value.match(/\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}\b/g);
                if (pass) {
                    return true;
                } else {
                    return "Please input a valid ip address";
                }
            }
        },
        {
            type: 'input',
            name: 'port',
            message: 'SSH port:',
            default: '22',
            validate: (value) => {
                let pass = value.match(/^([0-9]{1,4}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/g);
                if (pass) {
                    return true;
                } else {
                    return "Pleas input a valid port number";
                }
            }
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


    function inquireCluster() {
        prompt(qDomain).then(answer => {
            cluster = answer;
            inquireMaster();
        });
    }

    function inquireMaster() {
        console.info(chalk.green("Please input master info"));
        prompt(qNode).then(answer => {
            cluster.master = answer;
            cluster.workers = [];
            inquireWorker();
        });
    }

    function inquireWorker() {
        console.info(chalk.green("Please input worker info"));
        prompt(qNode).then(answer => {
            cluster.workers.push(answer);
            prompt(qAnotherWorker).then(answer => {
                if (answer.anotherWorker) {
                    inquireWorker();
                } else {
                    setupCluster(cluster);
                }
            })
        });
    }


    program.version('1.0.0');


    program
        .command('boot')
        .description('Boot a k8s cluster')
        .action(() => {
            inquireCluster();
        });
    program.parse(process.argv);

};