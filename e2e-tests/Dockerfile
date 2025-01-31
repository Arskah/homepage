FROM mcr.microsoft.com/playwright:v1.50.1-jammy@sha256:8845c40cdade98fd7a6cd32df75bfc234cd52b3278f9cd1f9fe8d6291e48ea03 AS deps
WORKDIR /test-runner

# Install dependencies
COPY pnpm-lock.yaml package.json ./

RUN corepack enable
RUN pnpm install

# Pass as volume in compose file
COPY dist dist
COPY tests tests
COPY playwright.config.ts .
COPY tsconfig.json .
