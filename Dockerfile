ARG PLATFORM=linux/amd64
FROM --platform=${PLATFORM} node:24.12.0@sha256:20988bcdc6dc76690023eb2505dd273bdeefddcd0bde4bfd1efe4ebf8707f747 AS build

ARG VERSION
WORKDIR /app
COPY . .

RUN npm install -g corepack@latest && corepack enable
RUN pnpm install && \
    pnpm astro check && \
    PUBLIC_VERSION=${VERSION} pnpm astro build

FROM --platform=${PLATFORM} httpd:2.4.66@sha256:e19cdd61f51985351ca9867d384cf1b050487d26bb1b49c470f2fcda1b5f276c AS runtime
COPY --from=build /app/dist /usr/local/apache2/htdocs/
EXPOSE 80
