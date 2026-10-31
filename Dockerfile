ARG PLATFORM=linux/amd64
FROM --platform=${PLATFORM} node:26.12.0@sha256:45a2bf9d9300e9cf47ecb375e38447c140c45ef5fbae869c430475b05b98d86e AS build

ARG VERSION
WORKDIR /app
COPY . .

# Install the pnpm that package.json pins, checked against the hash pinned with it
RUN PACKAGE_MANAGER="$(node -p 'require("./package.json").packageManager')" && \
    TARBALL="$(npm pack --silent --pack-destination /tmp "${PACKAGE_MANAGER%%+*}")" && \
    echo "${PACKAGE_MANAGER##*sha512.}  /tmp/${TARBALL}" | sha512sum -c - && \
    npm install -g "/tmp/${TARBALL}"
RUN pnpm install && \
    pnpm astro check && \
    PUBLIC_VERSION=${VERSION} pnpm astro build

FROM --platform=${PLATFORM} httpd:2.4.69@sha256:a30cd4cd57f3f3c3be9b2d16384d2488839996bb14c67df2b51f1ecbb3e584a1 AS runtime
COPY --from=build /app/dist /usr/local/apache2/htdocs/
COPY httpd/cache.conf httpd/proxy.conf /usr/local/apache2/conf/extra/
RUN echo "Include conf/extra/cache.conf" >> /usr/local/apache2/conf/httpd.conf && \
    echo "Include conf/extra/proxy.conf" >> /usr/local/apache2/conf/httpd.conf
EXPOSE 80
