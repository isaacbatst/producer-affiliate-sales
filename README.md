# Creators and Affiliates

## Context

This platform works with creator-affiliate structure, in which a creator sells his products and can have affiliates that also sells the products receiving a commission.

A transactions is a buy/sell contract. Each transaction changes the creator/affiliate balance.

[Visit here](https://ceaf.codandomuito.com.br)

## Features

- [x] **Home Page**: uploads sales files, processes and persists the operation.
- [x] **Home Page**: lists all transactions.
- [x] **Seller Page**: shows seller balance and transactions.
- [x] **Product Page**: show product creator/affiliates and transactions.
- [x] **Authentication**
- [X] **Error Handling**

## Setup

### Environment Variables

The environment variables must be set as described on `.env.example` files. 

- Frontend:
  - **API_URL**: url to reach api from client.
  - **BACKEND_API_URL**: url to reach api from backend (nextjs server side funcions)
- Backend
  - **DATABASE_URL**: url to reach postgres database. If you're using docker setup, the hostname is the database service name `database`.
  - **FRONTEND_URL** url to recognize allowed frontend to config cors
  - **ROOT_NAME**: root user name.
  - **ROOT_PASSWORD**: root user password.
  - **ROOT_EMAIL**: root user email.
- Root:
  - **POSTGRES_PASSWORD**: postgres password for docker database container.


### Docker

This project brings `docker-compose` files with production and development configuration.

- **Production build**: `env API_PORT=3000 docker-compose up`
- **Development build**:`env API_PORT=3000 docker compose -f docker-compose.dev.yml up`

> Note that if you don't set `API_PORT`, compose will publish the API into an ephemeral port.
