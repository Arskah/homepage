ARG PLATFORM=linux/amd64
FROM --platform=${PLATFORM} node:22.18.0@sha256:3218f0d1b9e4b63def322e9ae362d581fbeac1ef21b51fc502ef91386667ce92 AS build

ARG VERSION
WORKDIR /app
COPY . .

RUN npm install -g corepack@latest && corepack enable
RUN pnpm install && \
    pnpm astro check && \
    PUBLIC_VERSION=${VERSION} pnpm astro build

FROM --platform=${PLATFORM} httpd:2.4.63@sha256:1ae8051591a5ded56e4a3d7399c423e940e8475ad0e5adb82e6e10893fe9b365 AS runtime
COPY --from=build /app/dist /usr/local/apache2/htdocs/
EXPOSE 80
