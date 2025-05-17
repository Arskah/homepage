FROM mcr.microsoft.com/playwright:v1.52.0-jammy@sha256:ff2946177f0756c87482c0ef958b7cfbf389b92525ace78a1c9890281d0d60f4 AS deps
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
