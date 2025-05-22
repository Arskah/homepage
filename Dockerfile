ARG PLATFORM=linux/amd64
FROM --platform=${PLATFORM} node:22.15.0@sha256:a1f1274dadd49738bcd4cf552af43354bb781a7e9e3bc984cfeedc55aba2ddd8 AS build

ARG VERSION
WORKDIR /app
COPY . .

RUN npm install -g corepack@latest && corepack enable
RUN pnpm install && \
    pnpm astro check && \
    PUBLIC_VERSION=${VERSION} pnpm astro build

FROM --platform=${PLATFORM} httpd:2.4.63@sha256:09cb4b94edaaa796522c545328b62e9a0db60315c7be9f2b4e02204919926405 AS runtime
COPY --from=build /app/dist /usr/local/apache2/htdocs/
EXPOSE 80
