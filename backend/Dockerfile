FROM node:17-alpine as build

WORKDIR /build

COPY package*.json .
RUN npm ci

COPY . .
RUN npm run build

FROM node:17-alpine

WORKDIR /app
COPY --from=build /build/package*.json .
RUN npm ci --production

COPY --from=build /build/dist /app/dist

CMD [ "npm", "start" ]
