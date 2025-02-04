ARG PLATFORM=linux/amd64
FROM --platform=${PLATFORM} node:22.13.1@sha256:debe7ff79b1a92c699629d685c4b69ba531172d6dfd89e145fa528bfb18eefb7 AS build

ARG VERSION
WORKDIR /app
COPY . .

RUN corepack enable && \
    pnpm install && \
    pnpm astro check && \
    PUBLIC_VERSION=${VERSION} pnpm astro build

FROM --platform=${PLATFORM} httpd:2.4@sha256:3195404327ecd95b2fa0a5d4eac1f2206bb12996fb2561393f91254759e422b9 AS runtime
COPY --from=build /app/dist /usr/local/apache2/htdocs/
EXPOSE 80
