const clusterInfo = {
    domain: "example.com",
    master: {
        host: "k8smaster",
        ip: "192.168.50.150",
        password: "root",
        port: "22"
    },
    workers: [
        {
            host: "k8sworker1",
            ip: "192.168.50.151",
            password: "root",
            port: "22"
        },
        {
            host: "k8sworker2",
            ip: "192.168.50.152",
            password: "root",
            port: "22"
        }
    ]
};

module.exports = {clusterInfo};
