FROM mcr.microsoft.com/playwright:v1.54.1-jammy@sha256:f72b8d294edee6beadacfc1868abf746dbc31316b1927f39f393107053c58bd1 AS deps
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
