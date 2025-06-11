FROM mcr.microsoft.com/playwright:v1.53.0-jammy@sha256:a499633eaf3ac5aefef9c8d6932440f62b5967ef5229c4f1777b80ccb53d573d AS deps
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
