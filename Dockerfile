FROM node
ADD package.json /data/
WORKDIR /data
RUN npm install -g ember-cli
RUN npm install
ADD . /data
