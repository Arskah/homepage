ARG PLATFORM=linux/amd64
FROM --platform=${PLATFORM} node:24.15.0@sha256:33cf7f057918860b043c307751ef621d74ac96f875b79b6724dcebf2dfd0db6d AS build

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
