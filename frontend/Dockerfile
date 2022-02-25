FROM node:17-alpine as build

WORKDIR /build

COPY package*.json .
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine

COPY --from=build /build/dist /usr/share/nginx/html
