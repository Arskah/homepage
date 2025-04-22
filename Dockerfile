ARG PLATFORM=linux/amd64
FROM --platform=${PLATFORM} node:22.14.0@sha256:f6b9c31ace05502dd98ef777aaa20464362435dcc5e312b0e213121dcf7d8b95 AS build

ARG VERSION
WORKDIR /app
COPY . .

RUN npm install -g corepack@latest && corepack enable
RUN pnpm install && \
    pnpm astro check && \
    PUBLIC_VERSION=${VERSION} pnpm astro build

FROM --platform=${PLATFORM} httpd:2.4.63@sha256:4564ca7604957765bd2598e14134a1c6812067f0daddd7dc5a484431dd03832b AS runtime
COPY --from=build /app/dist /usr/local/apache2/htdocs/
EXPOSE 80
