ARG PLATFORM=linux/amd64
FROM --platform=${PLATFORM} node:26.13.0@sha256:6d2c7d5d074bf72f81ddc252b4fbb5d625bc028eeda49cb4b8c2ff8eda1ee617 AS build

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

FROM --platform=${PLATFORM} httpd:2.4.69@sha256:f6a86043744215e4be90cf8804375d90022a711d892c9aa2d7085c089ee2cb54 AS runtime
COPY --from=build /app/dist /usr/local/apache2/htdocs/
COPY httpd/cache.conf httpd/proxy.conf /usr/local/apache2/conf/extra/
RUN echo "Include conf/extra/cache.conf" >> /usr/local/apache2/conf/httpd.conf && \
    echo "Include conf/extra/proxy.conf" >> /usr/local/apache2/conf/httpd.conf
EXPOSE 80
