ARG PLATFORM=linux/amd64
FROM --platform=${PLATFORM} node:22.14.0@sha256:e5ddf893cc6aeab0e5126e4edae35aa43893e2836d1d246140167ccc2616f5d7 AS build

ARG VERSION
WORKDIR /app
COPY . .

RUN npm install -g corepack@latest && corepack enable
RUN pnpm install && \
    pnpm astro check && \
    PUBLIC_VERSION=${VERSION} pnpm astro build

FROM --platform=${PLATFORM} httpd:2.4.63@sha256:4564ca7604957765bd2598e14134a1c6812067f0daddd7dc5a484431dd03832b AS runtime
COPY --from=build /app/dist /usr/local/apache2/htdocs/
EXPOSE 80
