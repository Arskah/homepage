ARG PLATFORM=linux/amd64
FROM --platform=${PLATFORM} node:22.12.0@sha256:35a5dd72bcac4bce43266408b58a02be6ff0b6098ffa6f5435aeea980a8951d7 AS build

WORKDIR /app
COPY . .

RUN corepack enable && pnpm install && pnpm run build

FROM --platform=${PLATFORM} httpd:2.4@sha256:6bdbdf5ac16ac3d6ef543a693fd5dfafae2428b4b0cdc52a480166603a069136 AS runtime
COPY --from=build /app/dist /usr/local/apache2/htdocs/
EXPOSE 80
