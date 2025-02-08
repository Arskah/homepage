ARG PLATFORM=linux/amd64
FROM --platform=${PLATFORM} node:22.13.1@sha256:5145c882f9e32f07dd7593962045d97f221d57a1b609f5bf7a807eb89deff9d6 AS build

ARG VERSION
WORKDIR /app
COPY . .

RUN npm install -g corepack@latest && corepack enable
RUN pnpm install && \
    pnpm astro check && \
    PUBLIC_VERSION=${VERSION} pnpm astro build

FROM --platform=${PLATFORM} httpd:2.4@sha256:3195404327ecd95b2fa0a5d4eac1f2206bb12996fb2561393f91254759e422b9 AS runtime
COPY --from=build /app/dist /usr/local/apache2/htdocs/
EXPOSE 80
