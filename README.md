# QCG Secret Website

This website groups all the guide for the map secret of the Québec Games Murder Servers

## Development

Requirements:

- [Node.js](https://nodejs.org/en/download/)
- [pnpm](https://pnpm.io/installation)

Running the development server:

```bash
pnpm install
pnpm dev
```

## Deployment

The production build is ran with [Docker](https://www.docker.com/).

```bash
docker compose up -d --build --remove-orphans
```

## Contributing

Contributions are welcome!
