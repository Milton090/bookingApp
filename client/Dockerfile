FROM node:20 AS build

WORKDIR /app

RUN npm install -g @angular/cli@17.3.8

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build --omit=dev

FROM node:20 AS runtime

WORKDIR /app

COPY --from=build /app/dist/client/browser .

RUN npm install -g http-server

EXPOSE 4200

CMD ["http-server", ".", "-p", "4200"]
