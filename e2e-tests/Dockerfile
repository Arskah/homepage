FROM mcr.microsoft.com/playwright:v1.56.0-jammy@sha256:0ff863c1700afc42fb0964275e64e4980d539d999303e37cdacb52e9b73af9e3 AS deps
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
