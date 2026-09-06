ARG PLATFORM=linux/amd64
FROM --platform=${PLATFORM} node:24.20.0@sha256:be23f54a88d34e8824c741b19b91064094f92c1c97b194144bfc8b50d67258e2 AS build

ARG VERSION
WORKDIR /app
COPY . .

RUN npm install -g corepack@latest && corepack enable
RUN pnpm install && \
    pnpm astro check && \
    PUBLIC_VERSION=${VERSION} pnpm astro build

FROM --platform=${PLATFORM} httpd:2.4.68@sha256:b7c88cc3708bab3cc33ed0bc45657165453ba34bc783ba30dd9dc33746d51597 AS runtime
COPY --from=build /app/dist /usr/local/apache2/htdocs/
EXPOSE 80
