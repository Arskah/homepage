ARG PLATFORM=linux/amd64
FROM --platform=${PLATFORM} node:24.14.0@sha256:3a09aa6354567619221ef6c45a5051b671f953f0a1924d1f819ffb236e520e6b AS build

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
