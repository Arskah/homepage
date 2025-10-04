ARG PLATFORM=linux/amd64
FROM --platform=${PLATFORM} node:22.20.0@sha256:2bb201f33898d2c0ce638505b426f4dd038cc00e5b2b4cbba17b069f0fff1496 AS build

ARG VERSION
WORKDIR /app
COPY . .

RUN npm install -g corepack@latest && corepack enable
RUN pnpm install && \
    pnpm astro check && \
    PUBLIC_VERSION=${VERSION} pnpm astro build

FROM --platform=${PLATFORM} httpd:2.4.65@sha256:ca375ab8ef2cb8bede6b1bb97a943cce7f0a304d5459c05235b47bc2dccb98cd AS runtime
COPY --from=build /app/dist /usr/local/apache2/htdocs/
EXPOSE 80
