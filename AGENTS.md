# AGENTS.md

This file provides guidance to coding agents when working with code in this repository.

## What this is

Personal homepage + blog for `https://aarnihalinen.fi`, built on **Astro 7** with React 19 components. Deployed as a Docker image to `registry.aarnihalinen.fi/homepage`. Package manager is **pnpm** (see `packageManager` in `package.json`) — use `pnpm`, not npm/yarn. Node version comes from `.nvmrc`.

The site is static: `.tsx` components are rendered at build time and no component uses a `client:*` directive, so no React ships to the browser. The little interactivity there is uses plain scripts in `.astro` components (`ThemeToggle.astro`, `LifeBackground.astro`); prefer that over a `client:*` island for small things.

Navigation is client-side: `<ClientRouter />` in `BaseHead.astro` swaps pages in place, so the Life background keeps running across page changes. Consequences to keep in mind:

- Bundled `<script>`s in components run once per visit, not once per page. An element whose script keeps a reference to it (the canvas, the header buttons) needs `transition:persist`, otherwise it is replaced on navigation and loses its handlers.
- The router replaces the attributes of `<html>` and every `<head>` element the next page does not declare. That is why the theme is re-applied on `astro:after-swap`, and why `BaseHead.astro` links `/_astro/stylex.css` itself: `unplugin-stylex` only adds that stylesheet from a runtime script, which the router would drop, leaving the page without any StyleX styles.

The page background is Conway's Game of Life on a fixed `<canvas>` (`LifeBackground.astro`): a click on anything that is not a control brings three cells in a row to life under the pointer, and `LifeToggle.astro` is its play/pause button. Cells are drawn in `--color-cell`, which is chosen so that text on top of a live cell still passes WCAG AA; re-check contrast when changing it or the text colors.

## Commands

| Command                                       | Action                                                               |
| --------------------------------------------- | -------------------------------------------------------------------- |
| `pnpm dev`                                    | Dev server at `localhost:4321`                                       |
| `pnpm build`                                  | `astro check` (typecheck) **then** `astro build` → `dist/`           |
| `pnpm lint`                                   | ESLint                                                               |
| `pnpm exec prettier --check .`                | Prettier check (CI runs this; `--write` to fix)                      |
| `pnpm test`                                   | Playwright E2E against `pnpm preview`, so `pnpm build` first         |
| `pnpm test -g "blog page" --project chromium` | Single test by title, single browser                                 |
| `pnpm snapshots:linux test-results`           | Copy `*-actual.png` from a results dir into the linux snapshot files |

Always run Playwright through `pnpm test` (it passes `--config e2e-tests/playwright.config.ts`). A bare `pnpm exec playwright test` finds no config, so there is no `baseURL`, web server or browser projects and the tests fail.

## Styling — StyleX (migrated from Vanilla Extract)

- Per-component styles live in a sibling `Component.stylex.ts` exporting `stylex.create({...})` (`.tsx` components may define `stylex.create` inline instead, as `BlogTitle.tsx` does).
- Apply with `{...stylex.attrs(...)}` in `.astro` files and `{...stylex.props(...)}` in `.tsx` files. To combine a StyleX style with a plain global class in `.astro`, split the result: `class:list={["prose", prose.class]} style={prose.style}` (see `src/layouts/Page.astro`).
- **Palette single source of truth is `src/styles/global.css`** `:root` custom properties. `src/styles/tokens.stylex.ts` only _aliases_ them (`var(--color-...)`) into typed `colors`/`fonts` vars. Add a new color to the CSS `:root` first, then alias it in `tokens.stylex.ts`.
- **Theming:** every palette color is a `light-dark(<light>, <dark>)` pair and names are semantic (`bg`, `surface`, `border`, `text`, `muted`, `accent`), so a new color needs both values and nothing else. The theme follows the system `color-scheme`; `ThemeToggle.astro` overrides it through `data-theme` on `<html>` (stored in `localStorage`, applied before paint by the inline script in `BaseHead.astro`).
- Write media queries without a media type: `@media (max-width: 760px)`. StyleX compiles `@media screen and (...)` to `@media (screen) and (...)`, which never matches.
- `global.css` owns everything StyleX can't express: bare element selectors (`body`, headings, links), `@font-face`, the palette vars. Do not try to move these into StyleX.
- Prefer longhands (`borderTopWidth`, `marginBottom`, …). `background` is not usable — use `backgroundImage` plus a separate `backgroundRepeat`. Simple `padding`/`margin` shorthands do pass (see `Main.stylex.ts`); the `@stylexjs/valid-shorthands` and `@stylexjs/valid-styles` lint rules are the arbiter, so run `pnpm lint` after touching styles.
- Wired via `unplugin-stylex/astro` in `astro.config.mjs`; readable debug class names kept outside production (`dev: !isProduction`).

## Content

Blog posts are an Astro content collection in `src/content/blog/` (`.md`/`.mdx`, files starting `_` ignored). Frontmatter schema (`title`, `description`, `pubDate`, optional `heroImage`, `updatedDate`) enforced in `src/content.config.ts`. Retrieve with `getCollection("blog")`.

Fenced code blocks in posts are not linted (`globalIgnores` in `eslint.config.mjs`): they are illustrations and may be fragments or deliberately bad code. Code blocks in other Markdown files are linted, without type information, since they belong to no tsconfig. Highlighting uses Shiki with the `rose-pine` / `rose-pine-dawn` themes (`astro.config.mjs`).

The dev server keeps collection entries in `.astro/data-store.json`. If a deleted post still shows up in `pnpm dev`, restart it with `pnpm dev --force`.

## E2E visual regression

`e2e-tests/tests/visuals.spec.ts` does full-page screenshot diffs of `/` and `/blog`, in the light and the dark theme, across chromium/firefox/webkit. The config pins `colorScheme: "light"`; the dark tests override it. It also sets `reducedMotion: "reduce"`, under which the Life background stays paused on its first generation. The start pattern is seeded from `Math.random()`, which `visuals.spec.ts` pins in a `beforeEach`, so screenshots are deterministic. The canvas is viewport-sized, so in full-page screenshots the cells cover only the first viewport height. Snapshots are **platform-specific**: `*-darwin.png` generated locally, `*-linux.png` used in CI. Config is `e2e-tests/playwright.config.ts` (note `testDir: ./tests` is relative to that folder).

- Locally the config has `reuseExistingServer: true`: if anything is already listening on `:4321` (e.g. `pnpm dev`), tests screenshot _that_ instead of the built site. Stop the dev server before running tests.
- Update darwin baselines with `pnpm test --update-snapshots`.
- Linux baselines cannot be generated on macOS; they come from the `*-actual.png` files in the `playwright-report` artifact of a failed CI Playwright job, copied in by `pnpm snapshots:linux <test-results dir>`. Follow the `update-linux-snapshots` skill (`.claude/skills/update-linux-snapshots/SKILL.md`).

## Conventions & CI

- **ESLint flat config** (`eslint.config.mjs`) uses `perfectionist` recommended-natural — object keys / imports are sorted alphabetically. Keep new objects sorted or lint fails. Also enforces jsdoc, `jsx-a11y` strict, react-hooks, stylex, regexp.
- **Conventional Commits** required — commitlint + husky enforce on commit; PR titles checked (`pr-title.yml`); releases automated via **release-please** (`release-please.yml`). lint-staged runs prettier on all staged files but eslint only on `*.ts`, so `.astro`/`.tsx` lint errors surface only via `pnpm lint` or CI.
- `pnpm-workspace.yaml` sets `minimumReleaseAge: 4320` (3 days): a dependency version published more recently will not install unless listed in `minimumReleaseAgeExclude`. Dependencies are pinned to exact versions and bumped by Renovate.
- CI (`check-PR.yml`) fans out to `pr-title.yml`, `audit.yml` (non-blocking), `lint.yml` (prettier, eslint, Renovate config validation), `build.yml`, then `playwright.yml`, which tests the `dist/` artifact uploaded by the build job.
- Push to `main` triggers release-please → `docker-build.yml` (tags `:staging` and `:<sha>`). When a release is created, that image is re-tagged `:latest` and `:<release tag>`.
- The image (`Dockerfile`) builds the site and serves `dist/` from Apache httpd. The `VERSION` build arg becomes `PUBLIC_VERSION`, which `Footer.astro` displays (falls back to `development`).
- `k8s/` holds kustomize overlays over `k8s/base`: `staging` tracks the `:staging` tag, `prod` pins an explicit `newTag` in `k8s/prod/kustomization.yml`.
- GitHub Actions are pinned to commit SHAs — keep that when editing workflows.
