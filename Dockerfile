ARG PLATFORM=linux/amd64
FROM --platform=${PLATFORM} node:lts@sha256:196a5fcd13db4362fb9c0ec5391db36ec954c65d6b0d0e5d37f59c7dc9920690 AS build

WORKDIR /app
COPY . .

RUN corepack enable
RUN pnpm install
RUN pnpm run build

FROM --platform=${PLATFORM} httpd:2.4@sha256:d85a95917514069fe598c31bab55dcc221a14a6dc261c452a8b2d51e8cd9e95a AS runtime
COPY --from=build /app/dist /usr/local/apache2/htdocs/
EXPOSE 80
