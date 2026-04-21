ARG PLATFORM=linux/amd64
FROM --platform=${PLATFORM} node:24.15.0@sha256:33cf7f057918860b043c307751ef621d74ac96f875b79b6724dcebf2dfd0db6d AS build

ARG VERSION
WORKDIR /app
COPY . .

RUN npm install -g corepack@latest && corepack enable
RUN pnpm install && \
    pnpm astro check && \
    PUBLIC_VERSION=${VERSION} pnpm astro build

FROM --platform=${PLATFORM} httpd:2.4.66@sha256:bdba5c86022f2d6ad0783168b07fe80541fe45e97b434b13ba8c959a5050fb6b AS runtime
COPY --from=build /app/dist /usr/local/apache2/htdocs/
EXPOSE 80
