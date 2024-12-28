FROM node:20-alpine

WORKDIR /app

RUN npm install turbo --global

COPY . .

RUN npm install

EXPOSE 5173

CMD ["npm","run","dev"]
