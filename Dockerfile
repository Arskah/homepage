ARG PLATFORM=linux/amd64
FROM --platform=${PLATFORM} node:24.12.0@sha256:20988bcdc6dc76690023eb2505dd273bdeefddcd0bde4bfd1efe4ebf8707f747 AS build

ARG VERSION
WORKDIR /app
COPY . .

RUN npm install -g corepack@latest && corepack enable
RUN pnpm install && \
    pnpm astro check && \
    PUBLIC_VERSION=${VERSION} pnpm astro build

FROM --platform=${PLATFORM} httpd:2.4.66@sha256:dd178595edd6d4f49296f62f9587238db2cd1045adfff6fccc15a6c4d08f5d2e AS runtime
COPY --from=build /app/dist /usr/local/apache2/htdocs/
EXPOSE 80
