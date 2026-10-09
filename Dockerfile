ARG PLATFORM=linux/amd64
FROM --platform=${PLATFORM} node:24.20.0@sha256:be23f54a88d34e8824c741b19b91064094f92c1c97b194144bfc8b50d67258e2 AS build

ARG VERSION
WORKDIR /app
COPY . .

RUN npm install -g corepack@latest && corepack enable
RUN pnpm install && \
    pnpm astro check && \
    PUBLIC_VERSION=${VERSION} pnpm astro build

FROM --platform=${PLATFORM} httpd:2.4.68@sha256:03f858efb82c25cb0f9962946615cdcdaf26927cb971722149b563197cfd0fdd AS runtime
COPY --from=build /app/dist /usr/local/apache2/htdocs/
EXPOSE 80
