FROM node:20.8.0

WORKDIR /app

COPY . .

RUN npm install -g @nrwl/cli

RUN npm install

EXPOSE 4200

CMD ["npm", "start"]