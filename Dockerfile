ARG PLATFORM=linux/amd64
FROM --platform=${PLATFORM} node:24.10.0@sha256:06e54ecf113a30f0ff9a1d309866a5924d3bda4389eab11a0e1e92f3251d915d AS build

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
