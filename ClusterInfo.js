const clusterInfo = {
    domain: "example.com",
    master: {
        host: "k8smaster",
        ip: "192.168.50.150",
        password: "root"
    },
    workers: [
        {
            host: "k8sworker1",
            ip: "192.168.50.151",
            password: "root"
        },
        {
            hostName: "k8sworker2",
            ip: "192.168.50.152",
            password: "root"
        }
    ]
};

module.exports = {clusterInfo};
