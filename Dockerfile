ARG PLATFORM=linux/amd64
FROM --platform=${PLATFORM} node:22.17.0@sha256:0c0734eb7051babbb3e95cd74e684f940552b31472152edf0bb23e54ab44a0d7 AS build

ARG VERSION
WORKDIR /app
COPY . .

RUN npm install -g corepack@latest && corepack enable
RUN pnpm install && \
    pnpm astro check && \
    PUBLIC_VERSION=${VERSION} pnpm astro build

FROM --platform=${PLATFORM} httpd:2.4.63@sha256:c11efd67f6308f2c25965e4e9d13ded15e7c45c0367b95f619a16e03c6c1e2b1 AS runtime
COPY --from=build /app/dist /usr/local/apache2/htdocs/
EXPOSE 80
