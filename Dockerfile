ARG PLATFORM=linux/amd64
FROM --platform=${PLATFORM} node:22.19.0@sha256:6fe286835c595e53cdafc4889e9eff903dd3008a3050c1675809148d8e0df805 AS build

ARG VERSION
WORKDIR /app
COPY . .

RUN npm install -g corepack@latest && corepack enable
RUN pnpm install && \
    pnpm astro check && \
    PUBLIC_VERSION=${VERSION} pnpm astro build

FROM --platform=${PLATFORM} httpd:2.4.65@sha256:027c678f36d3cd3dd2b44ad1e963e81be66f9eba065381c1126d3019fffeb01a AS runtime
COPY --from=build /app/dist /usr/local/apache2/htdocs/
EXPOSE 80
