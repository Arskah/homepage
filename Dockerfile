ARG PLATFORM=linux/amd64
FROM --platform=${PLATFORM} node:22.19.0@sha256:afff6d8c97964a438d2e6a9c96509367e45d8bf93f790ad561a1eaea926303d9 AS build

ARG VERSION
WORKDIR /app
COPY . .

RUN npm install -g corepack@latest && corepack enable
RUN pnpm install && \
    pnpm astro check && \
    PUBLIC_VERSION=${VERSION} pnpm astro build

FROM --platform=${PLATFORM} httpd:2.4.65@sha256:6b3a12af48325f36ccd763e63fbf48caaee8753152a58030c776a40e7aba6b33 AS runtime
COPY --from=build /app/dist /usr/local/apache2/htdocs/
EXPOSE 80
