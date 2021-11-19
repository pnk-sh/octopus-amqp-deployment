FROM node:16-bullseye-slim

WORKDIR /app

COPY . .

RUN rm -rf ./node_modules

RUN touch .env
RUN rm .env

RUN npm install
RUN npm run build

CMD [ "npm", "run", "start" ]