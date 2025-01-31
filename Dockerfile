ARG PLATFORM=linux/amd64
FROM --platform=${PLATFORM} node:22.13.1@sha256:ae2f3d4cc65d251352eca01ba668824f651a2ee4d2a37e2efb22649521a483fd AS build

ARG VERSION
WORKDIR /app
COPY . .

RUN corepack enable && \
    pnpm install && \
    pnpm astro check && \
    PUBLIC_VERSION=${VERSION} pnpm astro build

FROM --platform=${PLATFORM} httpd:2.4@sha256:72f6e24600718dddef131de7cb5b31496b05c5af41e9db8707df371859a350bb AS runtime
COPY --from=build /app/dist /usr/local/apache2/htdocs/
EXPOSE 80
