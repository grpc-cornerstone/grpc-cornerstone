#!/bin/bash
cat <<YAML
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ledger
spec:
  replicas: 1
  selector:
    matchLabels:
      app: ledger
  template:
    metadata:
      labels:
        app: ledger
    spec:
      containers:
        - name: ledger
          image: eu.gcr.io/$GCP_PROJECT/grpc-cornerstone/ledger:latest
          imagePullPolicy: Always
          ports:
            - containerPort: 8092
          env:
            - name: foobar
              value: "$(date +%s)"
---
apiVersion: v1
kind: Service
metadata:
  name: ledger
spec:
  type: LoadBalancer
  selector:
    app: ledger
  ports:
   - port: 8092
     targetPort: 8092
     protocol: TCP
     name: grpc
YAML
