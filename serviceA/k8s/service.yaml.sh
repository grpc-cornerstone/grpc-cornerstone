#!/bin/bash
cat <<YAML
apiVersion: apps/v1
kind: Deployment
metadata:
  name: serviceA 
spec:
  replicas: 1
  selector:
    matchLabels:
      app: serviceA 
  template:
    metadata:
      labels:
        app: serviceA 
    spec:
      containers:
        - name: geese
          image: eu.gcr.io/$GCP_PROJECT/geese:latest
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
  name: serviceA 
spec:
  type: LoadBalancer
  selector:
    app: serviceA 
  ports:
   - port: 8092
     targetPort: 8092
     protocol: TCP
     name: grpc
YAML
