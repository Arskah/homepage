FROM mcr.microsoft.com/playwright:v1.51.0-jammy@sha256:51558049e0b094d5f7617f71b9cf0257a2846cb5eea5b63070e714cf2a50eff9 AS deps
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
