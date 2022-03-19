FROM node:16-alpine

ADD package.json /tmp/package.json

RUN rm -rf build

RUN cd /tmp && npm i -q

ADD ./ /src

RUN ls

RUN rm -rf /src/node_modules && cp -a /tmp/node_modules /src/

WORKDIR /src

RUN npm run build
CMD ["node", "build/index.js"]