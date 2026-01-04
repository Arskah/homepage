ARG PLATFORM=linux/amd64
FROM --platform=${PLATFORM} node:24.12.0@sha256:b52a8d1206132b36d60e51e413d9a81336e8a0206d3b648cabd6d5a49c4c0f54 AS build

ARG VERSION
WORKDIR /app
COPY . .

RUN npm install -g corepack@latest && corepack enable
RUN pnpm install && \
    pnpm astro check && \
    PUBLIC_VERSION=${VERSION} pnpm astro build

FROM --platform=${PLATFORM} httpd:2.4.66@sha256:b913eada2685f101f93267e0984109966bbcc3afea6c9b48ed389afbf89863aa AS runtime
COPY --from=build /app/dist /usr/local/apache2/htdocs/
EXPOSE 80
