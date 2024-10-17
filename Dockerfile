ARG PLATFORM=linux/amd64
FROM --platform=${PLATFORM} node:lts@sha256:196a5fcd13db4362fb9c0ec5391db36ec954c65d6b0d0e5d37f59c7dc9920690 AS build

WORKDIR /app
COPY . .

RUN corepack enable
RUN pnpm install
RUN pnpm run build

FROM --platform=${PLATFORM} httpd:2.4@sha256:ee0ce15163e11d9efd4b018c06d3a7ff0fd31def71f091c8e88b4d7e77a2b1a8 AS runtime
COPY --from=build /app/dist /usr/local/apache2/htdocs/
EXPOSE 80
