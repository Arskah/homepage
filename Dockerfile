ARG PLATFORM=linux/amd64
FROM --platform=${PLATFORM} node:24.21.0@sha256:3d27e5c11e5786e309ec3e03f93ae536eb36e6e5eb3714d5eb3300a36157add0 AS build

ARG VERSION
WORKDIR /app
COPY . .

RUN npm install -g corepack@latest && corepack enable
RUN pnpm install && \
    pnpm astro check && \
    PUBLIC_VERSION=${VERSION} pnpm astro build

FROM --platform=${PLATFORM} httpd:2.4.69@sha256:a30cd4cd57f3f3c3be9b2d16384d2488839996bb14c67df2b51f1ecbb3e584a1 AS runtime
COPY --from=build /app/dist /usr/local/apache2/htdocs/
COPY httpd/cache.conf httpd/proxy.conf /usr/local/apache2/conf/extra/
RUN echo "Include conf/extra/cache.conf" >> /usr/local/apache2/conf/httpd.conf && \
    echo "Include conf/extra/proxy.conf" >> /usr/local/apache2/conf/httpd.conf
EXPOSE 80
