FROM node
WORKDIR /
ADD ./node_modules node_modules
ADD ./package.json package.json
ADD ./package-lock.json package-lock.json
ADD ./tsconfig.json tsconfig.json
ADD ./public public
ADD ./src src

EXPOSE 3000
CMD npm start
