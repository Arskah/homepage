ARG PLATFORM=linux/amd64
FROM --platform=${PLATFORM} node:24.11.0@sha256:e5bbac0e9b8a6e3b96a86a82bbbcf4c533a879694fd613ed616bae5116f6f243 AS build

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
