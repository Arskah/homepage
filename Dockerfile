ARG PLATFORM=linux/amd64
FROM --platform=${PLATFORM} node:24.13.0@sha256:b2b2184ba9b78c022e1d6a7924ec6fba577adf28f15c9d9c457730cc4ad3807a AS build

ARG VERSION
WORKDIR /app
COPY . .

RUN npm install -g corepack@latest && corepack enable
RUN pnpm install && \
    pnpm astro check && \
    PUBLIC_VERSION=${VERSION} pnpm astro build

FROM --platform=${PLATFORM} httpd:2.4.66@sha256:b89c19a390514d6767e8c62f29375d0577190be448f63b24f5f11d6b03f7bf18 AS runtime
COPY --from=build /app/dist /usr/local/apache2/htdocs/
EXPOSE 80
