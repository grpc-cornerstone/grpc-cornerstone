#!/bin/bash
cat <<YAML
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mint
spec:
  replicas: 1
  selector:
    matchLabels:
      app: mint
  template:
    metadata:
      labels:
        app: mint
    spec:
      containers:
        - name: mint
          image: eu.gcr.io/$GCP_PROJECT/grpc-cornerstone/mint:latest
          imagePullPolicy: Always
          ports:
            - containerPort: 8091
          env:
            - name: foobar
              value: "$(date +%s)"
            - name: LEDGER_SERVICE_HOST
              value: "ledger"
            - name: LEDGER_SERVICE_PORT
              value: "8092"
---
apiVersion: v1
kind: Service
metadata:
  name: mint
spec:
  type: LoadBalancer
  selector:
    app: mint
  ports:
   - port: 8091
     targetPort: 8091
     protocol: TCP
     name: grpc
YAML
