#!/bin/bash
cat <<YAML
apiVersion: apps/v1
kind: Deployment
metadata:
  name: envoy
spec:
  replicas: 1
  selector:
    matchLabels:
      app: envoy
  template:
    metadata:
      labels:
        app: envoy
    spec:
      containers:
        - name: envoy
          image: us-east1-docker.pkg.dev/$GCP_PROJECT/grpc-cornerstone/envoy:latest
          imagePullPolicy: Always
          ports:
            - containerPort: 8080
          env:
            - name: foobar
              value: "$(date +%s)"
            - name: GATEWAY_SERVICE_HOST
              value: "gateway"
            - name: GATEWAY_SERVICE_PORT
              value: "8090"
---
apiVersion: v1
kind: Service
metadata:
  name: envoy
spec:
  type: LoadBalancer
  selector:
    app: envoy
  ports:
   - port: 80
     targetPort: 8080
     protocol: TCP
     name: http
YAML
