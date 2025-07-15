ARG PLATFORM=linux/amd64
FROM --platform=${PLATFORM} node:22.17.0@sha256:0c0734eb7051babbb3e95cd74e684f940552b31472152edf0bb23e54ab44a0d7 AS build

ARG VERSION
WORKDIR /app
COPY . .

RUN npm install -g corepack@latest && corepack enable
RUN pnpm install && \
    pnpm astro check && \
    PUBLIC_VERSION=${VERSION} pnpm astro build

FROM --platform=${PLATFORM} httpd:2.4.64@sha256:f84fe51ff5d35124e024f51215b443b16c939b24eae747025a515200e71c7d07 AS runtime
COPY --from=build /app/dist /usr/local/apache2/htdocs/
EXPOSE 80
