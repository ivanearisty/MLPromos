FROM node:20.9.0

WORKDIR /app

COPY . .

RUN npm install -g @nrwl/cli

RUN npm install

EXPOSE 4200

CMD ["npm", "run", "start"]
