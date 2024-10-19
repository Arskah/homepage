ARG PLATFORM=linux/amd64
FROM --platform=${PLATFORM} node:lts@sha256:d7c25dbb3da3f8d9990073780e3c1eb0f0c68a55ef5adf402aa96fb4ee49f6e1 AS build

WORKDIR /app
COPY . .

RUN corepack enable
RUN pnpm install
RUN pnpm run build

FROM --platform=${PLATFORM} httpd:2.4@sha256:bbea29057f25d9543e6a96a8e3cc7c7c937206d20eab2323f478fdb2469d536d AS runtime
COPY --from=build /app/dist /usr/local/apache2/htdocs/
EXPOSE 80
