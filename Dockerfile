ARG PLATFORM=linux/amd64
FROM --platform=${PLATFORM} node:24.11.0@sha256:34af25027ee1b8bffd482ba995ec1e577fbd398db87beb4c60b80c2c9c025127 AS build

ARG VERSION
WORKDIR /app
COPY . .

RUN npm install -g corepack@latest && corepack enable
RUN pnpm install && \
    pnpm astro check && \
    PUBLIC_VERSION=${VERSION} pnpm astro build

FROM --platform=${PLATFORM} httpd:2.4.65@sha256:d3b88ca0822f91e2dec6eb58a2ac7cfade27880926467fc63dcdbc857010b083 AS runtime
COPY --from=build /app/dist /usr/local/apache2/htdocs/
EXPOSE 80
