FROM mcr.microsoft.com/playwright:v1.53.2-jammy@sha256:61a3b6663a09ae17c841af8242475e87a9f547ee452a773d6ac88b56e9dddc12 AS deps
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
