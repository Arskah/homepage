ARG PLATFORM=linux/amd64
FROM --platform=${PLATFORM} node:lts@sha256:de4c8be8232b7081d8846360d73ce6dbff33c6636f2259cd14d82c0de1ac3ff2 AS build

WORKDIR /app
COPY . .

RUN corepack enable
RUN pnpm install
RUN pnpm run build

FROM --platform=${PLATFORM} httpd:2.4@sha256:bbea29057f25d9543e6a96a8e3cc7c7c937206d20eab2323f478fdb2469d536d AS runtime
COPY --from=build /app/dist /usr/local/apache2/htdocs/
EXPOSE 80
