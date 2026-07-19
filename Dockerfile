ARG PLATFORM=linux/amd64
FROM --platform=${PLATFORM} node:24.18.0@sha256:fdddfb3e688158251943d52eba361de991548f6814007acba4917ae6b512d6be AS build

ARG VERSION
WORKDIR /app
COPY . .

RUN npm install -g corepack@latest && corepack enable
RUN pnpm install && \
    pnpm astro check && \
    PUBLIC_VERSION=${VERSION} pnpm astro build

FROM --platform=${PLATFORM} httpd:2.4.68@sha256:305fd8326a27a137fedb8900f26375699ab233cc37793f35cf5d7c65671fb252 AS runtime
COPY --from=build /app/dist /usr/local/apache2/htdocs/
EXPOSE 80
