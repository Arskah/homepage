ARG PLATFORM=linux/amd64
FROM --platform=${PLATFORM} node:24.14.0@sha256:5a593d74b632d1c6f816457477b6819760e13624455d587eef0fa418c8d0777b AS build

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
