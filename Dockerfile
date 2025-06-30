FROM node:14

LABEL maintainer = "baekjaein <baek2506@gmail.com>"

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]