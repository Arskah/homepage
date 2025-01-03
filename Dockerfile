ARG PLATFORM=linux/amd64
FROM --platform=${PLATFORM} node:22.12.0@sha256:0e910f435308c36ea60b4cfd7b80208044d77a074d16b768a81901ce938a62dc AS build

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
