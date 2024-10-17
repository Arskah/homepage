ARG PLATFORM=linux/amd64
FROM --platform=${PLATFORM} node:lts@sha256:fffa89e023a3351904c04284029105d9e2ac7020886d683775a298569591e5bb AS build

WORKDIR /app
COPY . .

RUN corepack enable
RUN pnpm install
RUN pnpm run build

FROM --platform=${PLATFORM} httpd:2.4@sha256:ee0ce15163e11d9efd4b018c06d3a7ff0fd31def71f091c8e88b4d7e77a2b1a8 AS runtime
COPY --from=build /app/dist /usr/local/apache2/htdocs/
EXPOSE 80
