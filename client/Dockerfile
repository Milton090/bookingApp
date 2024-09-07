FROM node:20 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build --omit=dev


FROM nginx

COPY --from=build /app/dist/client/browser /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
