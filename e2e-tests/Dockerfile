FROM mcr.microsoft.com/playwright:v1.56.1-jammy@sha256:d518367161e599b64e4e8b83ff180be45bfe22efb78dde77fc4c2942340fe8ca AS deps
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
