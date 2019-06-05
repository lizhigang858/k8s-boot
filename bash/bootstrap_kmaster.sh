#!/bin/bash

echo "[TASK 1] Pull required images for k8s from aliyun and tag to official name"
images=(
'registry.cn-hangzhou.aliyuncs.com/k8s-wls/kube-apiserver:v1.14.1'
'registry.cn-hangzhou.aliyuncs.com/k8s-wls/kube-controller-manager:v1.14.1'
'registry.cn-hangzhou.aliyuncs.com/k8s-wls/kube-scheduler:v1.14.1'
'registry.cn-hangzhou.aliyuncs.com/k8s-wls/kube-proxy:v1.14.1'
'registry.cn-hangzhou.aliyuncs.com/k8s-wls/pause:3.1'
'registry.cn-hangzhou.aliyuncs.com/jxqc/etcd:3.3.10'
'registry.cn-hangzhou.aliyuncs.com/k8s-wls/coredns:1.3.1'
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


# Initialize Kubernetes
echo "[TASK 2] Initialize Kubernetes Cluster"
kubeadm init --apiserver-advertise-address=$1 --pod-network-cidr=10.244.0.0/16

# Copy Kube admin config
echo "[TASK 3] Copy kube admin config to  user .kube directory"
cp /etc/kubernetes/admin.conf /root/.kube/config

# Deploy flannel network
echo "[TASK 4] Deploy flannel network"
kubectl create -f /vagrant/kube-flannel.yml

# Generate Cluster join command
echo "[TASK 4] Generate and save cluster join command to /joincluster.sh"
kubeadm token create --print-join-command > /joincluster.sh
