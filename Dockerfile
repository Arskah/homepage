ARG PLATFORM=linux/amd64
FROM --platform=${PLATFORM} node:22.18.0@sha256:5cc527147c43e671934c3530e9f66863162db5f57ce1ed0f227a3bb57b93cfab AS build

ARG VERSION
WORKDIR /app
COPY . .

RUN npm install -g corepack@latest && corepack enable
RUN pnpm install && \
    pnpm astro check && \
    PUBLIC_VERSION=${VERSION} pnpm astro build

FROM --platform=${PLATFORM} httpd:2.4.65@sha256:fbc12199ccad031d8047e9c789d65aceee2d14f99ba90664cd3a3996867a5582 AS runtime
COPY --from=build /app/dist /usr/local/apache2/htdocs/
EXPOSE 80
