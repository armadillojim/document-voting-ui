FROM node:8-alpine

ENV HOME=/document-voting-api
RUN mkdir -p $HOME
WORKDIR $HOME

RUN npm install --quiet --global pm2

COPY ./package.json $HOME
RUN npm install --quiet

COPY . $HOME

CMD ["npm", "run", "start_dev"]
