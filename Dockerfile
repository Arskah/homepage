ARG PLATFORM=linux/amd64
FROM --platform=${PLATFORM} node:24.13.0@sha256:1de022d8459f896fff2e7b865823699dc7a8d5567507e8b87b14a7442e07f206 AS build

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
