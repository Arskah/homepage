ARG PLATFORM=linux/amd64
FROM --platform=${PLATFORM} node:24.13.1@sha256:00e9195ebd49985a6da8921f419978d85dfe354589755192dc090425ce4da2f7 AS build

ARG VERSION
WORKDIR /app
COPY . .

RUN npm install -g corepack@latest && corepack enable
RUN pnpm install && \
    pnpm astro check && \
    PUBLIC_VERSION=${VERSION} pnpm astro build

FROM --platform=${PLATFORM} httpd:2.4.66@sha256:96b1e8f69ee3adde956e819f7a7c3e706edef7ad88a26a491734015e5c595333 AS runtime
COPY --from=build /app/dist /usr/local/apache2/htdocs/
EXPOSE 80
