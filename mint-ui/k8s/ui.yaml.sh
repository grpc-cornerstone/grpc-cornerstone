#!/bin/bash
cat <<YAML
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mint-ui
spec:
  replicas: 1
  selector:
    matchLabels:
      app: mint-ui
  template:
    metadata:
      labels:
        app: mint-ui
    spec:
      containers:
        - name: mint-ui
          image: us-east1-docker.pkg.dev/$GCP_PROJECT/grpc-cornerstone/mint-ui:latest
          imagePullPolicy: Always
          ports:
            - containerPort: 3000
          env:
            - name: foobar
              value: "$(date +%s)"
            - name: GATEWAY_SERVICE_HOST
              value: "envoy"
            - name: GATEWAY_SERVICE_PORT
              value: "80"
---
apiVersion: v1
kind: Service
metadata:
  name: mint-ui
spec:
  type: LoadBalancer
  selector:
    app: mint-ui
  ports:
   - port: 80
     targetPort: 3000
     protocol: TCP
     name: http
YAML
