FROM node:18-alpine as base

FROM base as deps
WORKDIR /app
COPY package.json yarn.lock  .
RUN yarn --frozen-lockfile

FROM base as runner
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
EXPOSE 3000
ENTRYPOINT ["yarn"]
CMD ["start:prod"]