ARG PLATFORM=linux/amd64
FROM --platform=${PLATFORM} node:22.14.0@sha256:f6b9c31ace05502dd98ef777aaa20464362435dcc5e312b0e213121dcf7d8b95 AS build

ARG VERSION
WORKDIR /app
COPY . .

RUN npm install -g corepack@latest && corepack enable
RUN pnpm install && \
    pnpm astro check && \
    PUBLIC_VERSION=${VERSION} pnpm astro build

FROM --platform=${PLATFORM} httpd:2.4@sha256:10381816bb7e60ae3a9db3784f2966a8910b6ff07c4da54bd2d62d2671c8ab6e AS runtime
COPY --from=build /app/dist /usr/local/apache2/htdocs/
EXPOSE 80
