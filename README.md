# homepage

Personal homepage and blog for [aarnihalinen.fi](https://aarnihalinen.fi), built with [Astro](https://astro.build), React and [StyleX](https://stylexjs.com).

## Development

Requires the Node version in `.nvmrc` and [pnpm](https://pnpm.io).

| Command        | Action                                               |
| :------------- | :--------------------------------------------------- |
| `pnpm install` | Install dependencies                                 |
| `pnpm dev`     | Start the dev server at `localhost:4321`             |
| `pnpm build`   | Typecheck and build the site to `./dist/`            |
| `pnpm preview` | Serve the built site locally                         |
| `pnpm lint`    | Run ESLint                                           |
| `pnpm test`    | Run Playwright visual regression tests (build first) |

Blog posts live in `src/content/blog/` as Markdown or MDX. Static assets go in `public/`.

See [AGENTS.md](./AGENTS.md) for architecture, styling conventions, testing and CI details.

## Deployment

`docker compose up --build` builds the production image and serves it at `localhost:3000`. Pushes to `main` build and publish the image through GitHub Actions; Kubernetes manifests are in `k8s/`.

## Credit

Based on the Astro blog starter template, whose theme is based off of [Bear Blog](https://github.com/HermanMartinus/bearblog/).
