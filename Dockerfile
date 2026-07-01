ARG PLATFORM=linux/amd64
FROM --platform=${PLATFORM} node:24.18.0@sha256:fdddfb3e688158251943d52eba361de991548f6814007acba4917ae6b512d6be AS build

ARG VERSION
WORKDIR /app
COPY . .

RUN npm install -g corepack@latest && corepack enable
RUN pnpm install && \
    pnpm astro check && \
    PUBLIC_VERSION=${VERSION} pnpm astro build

FROM --platform=${PLATFORM} httpd:2.4.68@sha256:393435ee1a31437adeb1f03c134224c9ce5fa5f527e8c0cb9bea576b0d6fc742 AS runtime
COPY --from=build /app/dist /usr/local/apache2/htdocs/
EXPOSE 80
