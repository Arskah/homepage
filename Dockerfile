FROM node:lts@sha256:fffa89e023a3351904c04284029105d9e2ac7020886d683775a298569591e5bb AS build

WORKDIR /app
COPY . .

RUN corepack enable
RUN pnpm install
RUN pnpm run build

FROM httpd:2.4@sha256:7204bce27072f97f244337ebe93c1dfc93d358d103beefc4107ee359d74d9148 AS runtime
COPY --from=build /app/dist /usr/local/apache2/htdocs/
EXPOSE 80
