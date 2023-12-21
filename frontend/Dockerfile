FROM node:20.8.0
# 20.8.0 last working version

WORKDIR /app

COPY . .

RUN npm install
RUN npm install -g @angular/cli

EXPOSE 4200

CMD ["npm", "run", "docker2"]

# Build Only the Frontend Container: docker-compose build frontend-app
# Recreate the Frontend Container: docker-compose up -d --no-deps frontend-app


