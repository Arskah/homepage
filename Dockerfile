ARG PLATFORM=linux/amd64
FROM --platform=${PLATFORM} node:24.15.0@sha256:33cf7f057918860b043c307751ef621d74ac96f875b79b6724dcebf2dfd0db6d AS build

ARG VERSION
WORKDIR /app
COPY . .

RUN npm install -g corepack@latest && corepack enable
RUN pnpm install && \
    pnpm astro check && \
    PUBLIC_VERSION=${VERSION} pnpm astro build

FROM --platform=${PLATFORM} httpd:2.4.66@sha256:89a0b59e6d7285f00fc8df952a1579c31eb035cbdccb96690051e8bb6432cbea AS runtime
COPY --from=build /app/dist /usr/local/apache2/htdocs/
EXPOSE 80
