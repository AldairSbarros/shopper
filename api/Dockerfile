FROM node:16

WORKDIR /api

COPY package.json ./
RUN npm install

COPY ./dist ./dist
COPY . .

EXPOSE 8080

CMD [ "npm", "dist/server.js" ]