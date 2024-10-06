FROM mcr.microsoft.com/playwright:v1.47.2-jammy@sha256:eee5be766a342139241c9a51e6449cb8f6ff2847fbd0792f91793aaf0c7f4f46 AS deps
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
