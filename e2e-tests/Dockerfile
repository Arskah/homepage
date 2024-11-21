FROM mcr.microsoft.com/playwright:v1.49.0-jammy@sha256:98b1ad488de36b22d41fdd1b0c5b9cceaa78a8d2661c6ab02d2108a07c182338 AS deps
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
