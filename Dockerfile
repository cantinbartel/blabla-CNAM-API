FROM node:19-alpine

RUN npm install -g nodemon

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8080
# required for docker desktop port mapping

CMD ["npm", "start"]