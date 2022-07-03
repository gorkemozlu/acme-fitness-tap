#!/usr/bin/env bash

set -eux

THIS_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

rm -rf ${THIS_DIR}/../dist
pushd ${THIS_DIR}/..
cp ./src/shared/localDev-prod.js ./src/shared/localDev.js
cp ./src/shared/baseUrl-prod.js ./src/shared/baseUrl.js
yarn install
yarn build --base=/shop
popd
rm -rf ${THIS_DIR}/../deploy/public
cp -R ${THIS_DIR}/../dist ${THIS_DIR}/../deploy/public


# kubectl config use-context shared-services-admin@shared-services

# #kp image create shopping-v2 --tag harbor.ss.tkg-lab.k10s.io/acme/acme-shopping-v2:0.0.1 --local-path ../deploy -n acmebuild
# kp image patch shopping-v2  --local-path ../deploy -n acmebuild

# RESULT=$(kubectl get image -n acmebuild shopping-v2 -o json | jq -r '.status.conditions[] | select(.type == "Ready").status')
# while [ $RESULT != "True" ]
# do 
# sleep 3
# RESULT=$(kubectl get image -n acmebuild shopping-v2 -o json | jq -r '.status.conditions[] | select(.type == "Ready").status')
# done

# IMG=$(kubectl get image -n acmebuild shopping-v2 -o json | jq -r '.status.latestImage')
# echo $IMG

# kubectl config use-context dmz-admin@dmz

# kn service update -n acme shopping-kn --image $IMG
# # ytt -f ./deployment.yaml -f ./values.yaml  --data-value img=$IMG | kubectl apply -n acme -f -