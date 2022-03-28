#!/bin/bash
cat <<YAML
apiVersion: apps/v1
kind: Deployment
metadata:
  name: gateway
spec:
  replicas: 1
  selector:
    matchLabels:
      app: gateway
  template:
    metadata:
      labels:
        app: gateway
    spec:
      containers:
        - name: gateway
          image: us-east1-docker.pkg.dev/$GCP_PROJECT/grpc-cornerstone/gateway:latest
          imagePullPolicy: Always
          ports:
            - containerPort: 8090
          env:
            - name: foobar
              value: "$(date +%s)"
            - name: LEDGER_SERVICE_HOST
              value: "ledger"
            - name: LEDGER_SERVICE_PORT
              value: "8092"
            - name: MINT_SERVICE_HOST
              value: "mint"
            - name: MINT_SERVICE_PORT
              value: "8091"
---
apiVersion: v1
kind: Service
metadata:
  name: gateway
spec:
  type: LoadBalancer
  selector:
    app: gateway
  ports:
   - port: 8090
     targetPort: 8090
     protocol: TCP
     name: grpc
YAML
