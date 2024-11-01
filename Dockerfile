ARG PLATFORM=linux/amd64
FROM --platform=${PLATFORM} node:22.10.0@sha256:da53547a061beb7f11f58ee2231589b999acfca89bdf6dfd740627340c879f63 AS build

WORKDIR /app
COPY . .

RUN corepack enable && pnpm install && pnpm run build

FROM --platform=${PLATFORM} httpd:2.4@sha256:bbea29057f25d9543e6a96a8e3cc7c7c937206d20eab2323f478fdb2469d536d AS runtime
COPY --from=build /app/dist /usr/local/apache2/htdocs/
EXPOSE 80
