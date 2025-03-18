ARG PLATFORM=linux/amd64
FROM --platform=${PLATFORM} node:22.14.0@sha256:f6b9c31ace05502dd98ef777aaa20464362435dcc5e312b0e213121dcf7d8b95 AS build

ARG VERSION
WORKDIR /app
COPY . .

RUN npm install -g corepack@latest && corepack enable
RUN pnpm install && \
    pnpm astro check && \
    PUBLIC_VERSION=${VERSION} pnpm astro build

FROM --platform=${PLATFORM} httpd:2.4.63@sha256:391a8eb0c1ed464163da46099606a5ec293705118f3054d6c60f5957e2485bd0 AS runtime
COPY --from=build /app/dist /usr/local/apache2/htdocs/
EXPOSE 80
