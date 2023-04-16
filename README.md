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

> Currently, only frontend folder needs it.

#### Frontend

- **API_URL**: url to reach backend api.

### Docker

This project brings `docker-compose` files with production and development configuration.

- **Production build**: `docker-compose up`
- **Development build**:`docker compose -f docker-compose.dev.yml up`