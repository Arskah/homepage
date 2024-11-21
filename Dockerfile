ARG PLATFORM=linux/amd64
FROM --platform=${PLATFORM} node:22.11.0@sha256:5c76d05034644fa8ecc9c2aa84e0a83cd981d0ef13af5455b87b9adf5b216561 AS build

WORKDIR /app
COPY . .

RUN corepack enable && pnpm install && pnpm run build

FROM --platform=${PLATFORM} httpd:2.4@sha256:6bdbdf5ac16ac3d6ef543a693fd5dfafae2428b4b0cdc52a480166603a069136 AS runtime
COPY --from=build /app/dist /usr/local/apache2/htdocs/
EXPOSE 80
