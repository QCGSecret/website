FROM node:21.5-alpine
LABEL name "qcgsecret"

WORKDIR /opt/build

RUN apk add --update \
  && apk add --no-cache ca-certificates \
  && apk add --no-cache --virtual .build-deps curl git python3 alpine-sdk libc6-compat openssl1.1-compat-dev
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

COPY package.json tsconfig.json pnpm-lock.yaml .npmrc astro.config.mjs tailwind.config.js ./

COPY /src/ ./src/
COPY /public/ ./public/

RUN pnpm install --frozen-lockfile --ignore-scripts=false
RUN pnpm run build

EXPOSE 3001
ENV PORT 3001
ENV HOST 0.0.0.0

CMD ["pnpm", "start"]
