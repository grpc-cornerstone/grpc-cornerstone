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
        - name: geese
          image: eu.gcr.io/$GCP_PROJECT/mint:latest
          imagePullPolicy: Always
          ports:
            - containerPort: 8092
          env:
            - name: foobar
              value: "$(date +%s)"
            - name: ZIPKIN_SERVICE_HOST
              value: "zipkin"
            - name: ZIPKIN_SERVICE_PORT
              value: "9411"
            - name: GCP_PROJECTID
              value: $GCP_PROJECT
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
   - port: 8092
     targetPort: 8092
     protocol: TCP
     name: grpc
YAML
