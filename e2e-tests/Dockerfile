FROM mcr.microsoft.com/playwright:v1.55.1-jammy@sha256:a012a91c32e36b3300514684c5bdb60c07f01464abd03380320179e5273427ab AS deps
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
