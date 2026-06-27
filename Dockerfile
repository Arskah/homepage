ARG PLATFORM=linux/amd64
FROM --platform=${PLATFORM} node:24.18.0@sha256:fdddfb3e688158251943d52eba361de991548f6814007acba4917ae6b512d6be AS build

ARG VERSION
WORKDIR /app
COPY . .

RUN npm install -g corepack@latest && corepack enable
RUN pnpm install && \
    pnpm astro check && \
    PUBLIC_VERSION=${VERSION} pnpm astro build

FROM --platform=${PLATFORM} httpd:2.4.68@sha256:b7c88cc3708bab3cc33ed0bc45657165453ba34bc783ba30dd9dc33746d51597 AS runtime
COPY --from=build /app/dist /usr/local/apache2/htdocs/
EXPOSE 80
