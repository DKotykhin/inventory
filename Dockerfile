FROM node:18

RUN mkdir -p /app
WORKDIR /app

COPY package.json /app
COPY package-lock.json /app

RUN npm install

COPY . /app

RUN npm run build
RUN npm run postinstall

EXPOSE 3000

CMD ["npm", "start"]