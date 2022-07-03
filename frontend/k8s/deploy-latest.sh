#!/usr/bin/env bash

IMG=$(kubectl get image -n acmebuild shopping-v2 -o json | jq -r '.status.latestImage')
echo $IMG

ytt -f ./deployment.yaml -f ./values.yaml  --data-value img=$IMG | kubectl apply -n acmefitness -f -