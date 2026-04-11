ARG PLATFORM=linux/amd64
FROM --platform=${PLATFORM} node:24.14.1@sha256:80fc934952c8f1b2b4d39907af7211f8a9fff1a4c2cf673fb49099292c251cec AS build

ARG VERSION
WORKDIR /app
COPY . .

RUN npm install -g corepack@latest && corepack enable
RUN pnpm install && \
    pnpm astro check && \
    PUBLIC_VERSION=${VERSION} pnpm astro build

FROM --platform=${PLATFORM} httpd:2.4.66@sha256:331548c5249bdeced0f048bc2fb8c6b6427d2ec6508bed9c1fec6c57d0b27a60 AS runtime
COPY --from=build /app/dist /usr/local/apache2/htdocs/
EXPOSE 80
