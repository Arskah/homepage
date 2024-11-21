ARG PLATFORM=linux/amd64
FROM --platform=${PLATFORM} node:22.11.0@sha256:de4c8be8232b7081d8846360d73ce6dbff33c6636f2259cd14d82c0de1ac3ff2 AS build

WORKDIR /app
COPY . .

RUN corepack enable && pnpm install && pnpm run build

FROM --platform=${PLATFORM} httpd:2.4@sha256:6bdbdf5ac16ac3d6ef543a693fd5dfafae2428b4b0cdc52a480166603a069136 AS runtime
COPY --from=build /app/dist /usr/local/apache2/htdocs/
EXPOSE 80
