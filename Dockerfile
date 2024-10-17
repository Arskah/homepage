ARG PLATFORM=linux/amd64
FROM --platform=${PLATFORM} node:lts@sha256:fffa89e023a3351904c04284029105d9e2ac7020886d683775a298569591e5bb AS build

WORKDIR /app
COPY . .

RUN corepack enable
RUN pnpm install
RUN pnpm run build

FROM --platform=${PLATFORM} httpd:2.4@sha256:2d821d0c37dc00fb71eb239d53e7086a87ce7e1d092e52dfb6e2b569749bb6bd AS runtime
COPY --from=build /app/dist /usr/local/apache2/htdocs/
EXPOSE 80
