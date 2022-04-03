FROM node
WORKDIR /
ADD ./build build

RUN npm install -g serve

EXPOSE 3000
CMD serve -s build
