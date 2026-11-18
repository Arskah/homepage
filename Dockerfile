ARG PLATFORM=linux/amd64
FROM --platform=${PLATFORM} node:26.13.1@sha256:e18c3ccdf7d71619990b0e85639f506e2028a95410999cab24cc373cbd10e0ac AS build

ARG VERSION
WORKDIR /app
COPY . .

# Install the pnpm that package.json pins, checked against the hash pinned with it
RUN PACKAGE_MANAGER="$(node -p 'require("./package.json").packageManager')" && \
    TARBALL="$(npm pack --silent --pack-destination /tmp "${PACKAGE_MANAGER%%+*}")" && \
    echo "${PACKAGE_MANAGER##*sha512.}  /tmp/${TARBALL}" | sha512sum -c - && \
    npm install -g "/tmp/${TARBALL}"
RUN pnpm install && \
    pnpm astro check && \
    PUBLIC_VERSION=${VERSION} pnpm astro build

FROM --platform=${PLATFORM} caddy:2.11.9-alpine@sha256:003a97808e781aa9f7e75cc2f43d34d461099031faf5e20faefb9f61126836f0 AS runtime
COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/dist /srv
EXPOSE 80
