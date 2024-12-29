FROM node:20-alpine

RUN addgroup app && adduser -S -G app app

USER app

WORKDIR /app

COPY package* .
COPY apps/client/package.json ./apps/client/package.json
COPY apps/server/package.json ./apps/server/package.json

USER root

RUN chown -R app:app .

USER app

RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm","run","dev"]
