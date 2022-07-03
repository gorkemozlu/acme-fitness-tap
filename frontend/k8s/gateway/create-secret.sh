#!/usr/bin/env bash
kubectl create secret generic acme-sso-credentials --from-env-file=./sso-credentials.txt -n acmefitness
