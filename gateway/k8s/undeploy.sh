#!/bin/bash

if [ -z $GCP_PROJECT ]; then echo "GCP_PROJECT is not set"; exit -1; fi

$(dirname $0)/service.yaml.sh | kubectl delete -f -
