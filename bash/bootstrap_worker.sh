#!/bin/bash

echo "[TASK 0] Pull required images for k8s from aliyun and tag to official name"
images=(
'gcr.akscn.io/google_containers/kube-proxy:v1.14.2'
'gcr.akscn.io/google_containers/pause:3.1'
)

official_prefix=k8s.gcr.io/

for i in ${images[@]} ; do
    docker pull $i
    docker tag $i ${official_prefix}${i##*/}
    docker rmi $i
done

images1=(
'registry.cn-hangzhou.aliyuncs.com/osoulmate/flannel:v0.10.0-amd64'
)

official_prefix1=quay.io/coreos/

for i in ${images1[@]} ; do
    docker pull $i
    docker tag $i ${official_prefix1}${i##*/}
    docker rmi $i
done

# Join worker nodes to the Kubernetes cluster
echo "[TASK 1] Join node to Kubernetes Cluster"
yum install -q -y sshpass
sshpass -p $2 scp -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no $1:/joincluster.sh /joincluster.sh
bash /joincluster.sh
