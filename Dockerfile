ARG PLATFORM=linux/amd64
FROM --platform=${PLATFORM} node:24.21.0@sha256:3d27e5c11e5786e309ec3e03f93ae536eb36e6e5eb3714d5eb3300a36157add0 AS build

ARG VERSION
WORKDIR /app
COPY . .

RUN npm install -g corepack@latest && corepack enable
RUN pnpm install && \
    pnpm astro check && \
    PUBLIC_VERSION=${VERSION} pnpm astro build

FROM --platform=${PLATFORM} httpd:2.4.68@sha256:03f858efb82c25cb0f9962946615cdcdaf26927cb971722149b563197cfd0fdd AS runtime
COPY --from=build /app/dist /usr/local/apache2/htdocs/
EXPOSE 80
