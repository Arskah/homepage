FROM mcr.microsoft.com/playwright:v1.49.1-jammy@sha256:019b822658965bf5f6d509472802797554360f2940e677b2afb0f17748d0d0e3 AS deps
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
