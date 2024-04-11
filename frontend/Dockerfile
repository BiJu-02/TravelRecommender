FROM node:20 as build
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build && ls /app

FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
