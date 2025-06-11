ARG PLATFORM=linux/amd64
FROM --platform=${PLATFORM} node:22.15.0@sha256:a1f1274dadd49738bcd4cf552af43354bb781a7e9e3bc984cfeedc55aba2ddd8 AS build

ARG VERSION
WORKDIR /app
COPY . .

RUN npm install -g corepack@latest && corepack enable
RUN pnpm install && \
    pnpm astro check && \
    PUBLIC_VERSION=${VERSION} pnpm astro build

FROM --platform=${PLATFORM} httpd:2.4.63@sha256:f6557a77ee2f16c50a5ccbb2564a3fd56087da311bf69a160d43f73b23d3af2d AS runtime
COPY --from=build /app/dist /usr/local/apache2/htdocs/
EXPOSE 80
