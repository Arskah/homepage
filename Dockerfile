ARG PLATFORM=linux/amd64
FROM --platform=${PLATFORM} node:24.11.1@sha256:9a2ed90cd91b1f3412affe080b62e69b057ba8661d9844e143a6bbd76a23260f AS build

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
