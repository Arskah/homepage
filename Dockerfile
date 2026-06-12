ARG PLATFORM=linux/amd64
FROM --platform=${PLATFORM} node:24.16.0@sha256:40ad9f3064e67d6860b4bc3fe1880b2953934fd6320ada990e45fe0efa6badd7 AS build

ARG VERSION
WORKDIR /app
COPY . .

RUN npm install -g corepack@latest && corepack enable
RUN pnpm install && \
    pnpm astro check && \
    PUBLIC_VERSION=${VERSION} pnpm astro build

FROM --platform=${PLATFORM} httpd:2.4.67@sha256:bac8021a9b7ad41a399dc72bb0e1f0b832b565632df7e62871e07d2aca8b293e AS runtime
COPY --from=build /app/dist /usr/local/apache2/htdocs/
EXPOSE 80
