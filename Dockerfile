ARG PLATFORM=linux/amd64
FROM --platform=${PLATFORM} node:24.17.0@sha256:032e78d7e54e352129831743737e3a83171d9cc5b5896f411649c597ce0b11ea AS build

ARG VERSION
WORKDIR /app
COPY . .

RUN npm install -g corepack@latest && corepack enable
RUN pnpm install && \
    pnpm astro check && \
    PUBLIC_VERSION=${VERSION} pnpm astro build

FROM --platform=${PLATFORM} httpd:2.4.67@sha256:bac8021a9b7ad41a399dc72bb0e1f0b832b565632df7e62871e07d2aca8b293e AS runtime
COPY --from=build /app/dist /usr/local/apache2/htdocs/
EXPOSE 80
