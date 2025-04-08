FROM mcr.microsoft.com/playwright:v1.51.1-jammy@sha256:79da45705a7c3f147c435ac6d0beeddf2e132f53263cb27bed90beafbb2e552b AS deps
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
