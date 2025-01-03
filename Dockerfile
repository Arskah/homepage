ARG PLATFORM=linux/amd64
FROM --platform=${PLATFORM} node:22.12.0@sha256:0e910f435308c36ea60b4cfd7b80208044d77a074d16b768a81901ce938a62dc AS build

ARG VERSION
WORKDIR /app
COPY . .

RUN corepack enable && \
    pnpm install && \
    pnpm astro check && \
    PUBLIC_VERSION=${VERSION} pnpm astro build

FROM --platform=${PLATFORM} httpd:2.4@sha256:f4c5139eda466e45814122d9bd8b886d8ef6877296126c09b76dbad72b03c336 AS runtime
COPY --from=build /app/dist /usr/local/apache2/htdocs/
EXPOSE 80
