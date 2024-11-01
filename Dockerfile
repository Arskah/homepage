ARG PLATFORM=linux/amd64
FROM --platform=${PLATFORM} node:20.18.0 AS build

WORKDIR /app
COPY . .

RUN corepack enable
RUN pnpm install
RUN pnpm run build

FROM --platform=${PLATFORM} httpd:2.4@sha256:bbea29057f25d9543e6a96a8e3cc7c7c937206d20eab2323f478fdb2469d536d AS runtime
COPY --from=build /app/dist /usr/local/apache2/htdocs/
EXPOSE 80
