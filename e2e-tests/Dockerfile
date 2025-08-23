FROM mcr.microsoft.com/playwright:v1.55.0-jammy@sha256:55db7b712a981e9cc1ec757a4511cd01c5ed4e20bd7c84b2dee4e1d320102b9d AS deps
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
