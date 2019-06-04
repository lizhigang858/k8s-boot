const program = require('commander');
const {prompt} = require('inquirer');
const shell = require('shelljs');

module.exports = () => {

    program.version('1.0.0');
    program.command('boot', 'Boot a k8s cluster');
    program.parse(process.argv);
    if (process.argv.slice(2).length) {
        program.outputHelp();
    }

    shell.exec('hostnamectl').stdout;







};