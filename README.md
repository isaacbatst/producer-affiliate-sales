# Creators and Affiliates

## Context

This platform works with creator-affiliate structure, in which a creator sells his products and can have affiliates that also sells the products, as long as they pay a commission.

A transactions is a buy/sell contract. Each transaction changes the creator/affiliate balance.

## Features

- [x] **Home Page**: uploads sales files, processes and persists the operation.
- [x] **Home Page**: lists all transactions.
- [x] **Seller Page**: shows seller balance.
- [] Error handling.

## Setup

### Environment Variables

The environment variables must be set as described on `.env.example` files. 

- Frontend:
  - **API_URL**: url to reach backend api.
- Backend
  - **DATABASE_URL**: url to reach postgres database.
- Root:
  - **POSTGRES_PASSWORD**: postgres password for docker database container.


### Docker

This project brings `docker-compose` files with production and development configuration.

- **Production build**: `env API_PORT=3000 docker-compose up`
- **Development build**:`env API_PORT=3000 docker compose -f docker-compose.dev.yml up`

> Note that if you don't set `API_PORT`, compose will publish the API into an ephemeral port.

### Database

You'll need to run database migrations manually:

- Enter backend folder
- Assure it's `.env` has proper `DATABASE_URL` configured.
- Run migrations:

```sh
npx prisma migrate dev
```

> At production you'd use `migrate deploy`.