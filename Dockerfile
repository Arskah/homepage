ARG PLATFORM=linux/amd64
FROM --platform=${PLATFORM} node:22.13.1@sha256:ae2f3d4cc65d251352eca01ba668824f651a2ee4d2a37e2efb22649521a483fd AS build

ARG VERSION
WORKDIR /app
COPY . .

RUN corepack enable && \
    pnpm install && \
    pnpm astro check && \
    PUBLIC_VERSION=${VERSION} pnpm astro build

FROM --platform=${PLATFORM} httpd:2.4@sha256:437b9f7d469dd606fa6d2a5f9a3be55fe3af7e0c66e0329da8c14b291ae0d31c AS runtime
COPY --from=build /app/dist /usr/local/apache2/htdocs/
EXPOSE 80
