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

FROM --platform=${PLATFORM} caddy:2.11.7-alpine@sha256:d8542f48d34a9cf4e4c11a478865229840e87e4c96ea3f439101f31a5d35f75f AS runtime
COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/dist /srv
EXPOSE 80
