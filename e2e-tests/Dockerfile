FROM mcr.microsoft.com/playwright:v1.54.2-jammy@sha256:948dc1e8601eeb152b31ef57959a74c2170be6fe875c33518bf33aea424d8940 AS deps
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
