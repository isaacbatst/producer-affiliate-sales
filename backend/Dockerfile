FROM node:18-alpine as build
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN yarn --frozen-lockfile
COPY . .
RUN yarn build
ENTRYPOINT ["yarn"]
EXPOSE 3000
CMD ["start:prod"]