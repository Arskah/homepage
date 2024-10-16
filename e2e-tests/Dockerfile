FROM mcr.microsoft.com/playwright:v1.48.1-jammy@sha256:8c8076751fb2936d5ca45eb75d5cfa1a6dc0e5b529f3643862649b7f0515bd3f AS deps
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
