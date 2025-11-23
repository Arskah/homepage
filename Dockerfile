ARG PLATFORM=linux/amd64
FROM --platform=${PLATFORM} node:24.11.1@sha256:aa648b387728c25f81ff811799bbf8de39df66d7e2d9b3ab55cc6300cb9175d9 AS build

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
