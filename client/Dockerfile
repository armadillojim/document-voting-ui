FROM node:8-alpine

ENV HOME=/document-voting-client
RUN mkdir -p $HOME
WORKDIR $HOME

COPY ./package.json $HOME
RUN npm install --quiet

COPY . $HOME

CMD ["npm", "start"]
