ARG PLATFORM=linux/amd64
FROM --platform=${PLATFORM} node:24.12.0@sha256:20988bcdc6dc76690023eb2505dd273bdeefddcd0bde4bfd1efe4ebf8707f747 AS build

ARG VERSION
WORKDIR /app
COPY . .

RUN npm install -g corepack@latest && corepack enable
RUN pnpm install && \
    pnpm astro check && \
    PUBLIC_VERSION=${VERSION} pnpm astro build

FROM --platform=${PLATFORM} httpd:2.4.65@sha256:f9b88f3f093d925525ec272bbe28e72967ffe1a40da813fe84df9fcb2fad3f30 AS runtime
COPY --from=build /app/dist /usr/local/apache2/htdocs/
EXPOSE 80
