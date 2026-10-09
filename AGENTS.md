# AGENTS.md

This file provides guidance to coding agents when working with code in this repository.

## What this is

Personal homepage + blog for `https://aarnihalinen.fi`, built on **Astro 7** with React 19 components. Deployed as a Docker image to `registry.aarnihalinen.fi/homepage`. Package manager is **pnpm** (see `packageManager` in `package.json`) — use `pnpm`, not npm/yarn. Node version comes from `.nvmrc`.

The site is fully static: `.tsx` components are rendered at build time and no component uses a `client:*` directive, so nothing hydrates. Adding interactivity means adding a `client:*` directive at the usage site.

`README.md` is the unmodified Astro blog starter template (npm commands, generic structure) — ignore it in favour of this file.

## Commands

| Command                                        | Action                                                               |
| ---------------------------------------------- | -------------------------------------------------------------------- |
| `pnpm dev`                                     | Dev server at `localhost:4321`                                       |
| `pnpm build`                                   | `astro check` (typecheck) **then** `astro build` → `dist/`           |
| `pnpm lint`                                    | ESLint                                                               |
| `pnpm exec prettier --check .`                 | Prettier check (CI runs this; `--write` to fix)                      |
| `pnpm test`                                    | Playwright E2E against `pnpm preview`, so `pnpm build` first         |
| `pnpm test -g "about page" --project chromium` | Single test by title, single browser                                 |
| `pnpm snapshots:linux test-results`            | Copy `*-actual.png` from a results dir into the linux snapshot files |

Always run Playwright through `pnpm test` (it passes `--config e2e-tests/playwright.config.ts`). A bare `pnpm exec playwright test` finds no config, so there is no `baseURL`, web server or browser projects and the tests fail.

## Styling — StyleX (migrated from Vanilla Extract)

- Per-component styles live in a sibling `Component.stylex.ts` exporting `stylex.create({...})` (`.tsx` components may define `stylex.create` inline instead, as `BlogTitle.tsx` does).
- Apply with `{...stylex.attrs(...)}` in `.astro` files and `{...stylex.props(...)}` in `.tsx` files. To combine a StyleX style with a plain global class in `.astro`, split the result: `class:list={["prose", prose.class]} style={prose.style}` (see `src/layouts/Page.astro`).
- **Palette single source of truth is `src/styles/global.css`** `:root` custom properties. `src/styles/tokens.stylex.ts` only _aliases_ them (`var(--color-...)`) into typed `colors`/`theme` vars. Add a new color to the CSS `:root` first, then alias it in `tokens.stylex.ts`.
- `global.css` owns everything StyleX can't express: bare element selectors (`body`, headings, links), `@font-face`, the palette vars. Do not try to move these into StyleX.
- Prefer longhands (`borderTopWidth`, `marginBottom`, …). `background` is not usable — use `backgroundImage` plus a separate `backgroundRepeat`. Simple `padding`/`margin` shorthands do pass (see `Main.stylex.ts`); the `@stylexjs/valid-shorthands` and `@stylexjs/valid-styles` lint rules are the arbiter, so run `pnpm lint` after touching styles.
- Wired via `unplugin-stylex/astro` in `astro.config.mjs`; readable debug class names kept outside production (`dev: !isProduction`).

## Content

Blog posts are an Astro content collection in `src/content/blog/` (`.md`/`.mdx`, files starting `_` ignored). Frontmatter schema (`title`, `description`, `pubDate`, optional `heroImage`, `updatedDate`) enforced in `src/content.config.ts`. Retrieve with `getCollection("blog")`.

## E2E visual regression

`e2e-tests/tests/visuals.spec.ts` does full-page screenshot diffs of `/`, `/blog`, `/about` across chromium/firefox/webkit. Snapshots are **platform-specific**: `*-darwin.png` generated locally, `*-linux.png` used in CI. Config is `e2e-tests/playwright.config.ts` (note `testDir: ./tests` is relative to that folder).

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
