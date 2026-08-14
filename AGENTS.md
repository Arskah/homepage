# AGENTS.md

This file provides guidance to coding agents when working with code in this repository.

## What this is

Personal homepage + blog for `https://aarnihalinen.fi`, built on **Astro 7** with React 19 islands. Deployed as a Docker image to `registry.aarnihalinen.fi/homepage`. Package manager is **pnpm** (see `packageManager` in `package.json`) — use `pnpm`, not npm/yarn.

## Commands

| Command                                                           | Action                                                               |
| ----------------------------------------------------------------- | -------------------------------------------------------------------- |
| `pnpm dev`                                                        | Dev server at `localhost:4321`                                       |
| `pnpm build`                                                      | `astro check` (typecheck) **then** `astro build` → `dist/`           |
| `pnpm lint`                                                       | ESLint                                                               |
| `pnpm exec prettier --check .`                                    | Prettier check (CI runs this; `--write` to fix)                      |
| `pnpm test`                                                       | Playwright E2E; `webServer` auto-runs `pnpm preview`, so build first |
| `pnpm exec playwright test tests/visuals.spec.ts -g "about page"` | Single test by title                                                 |
| `pnpm snapshots:linux <dir>`                                      | Copy `*-actual.png` from a dir into linux snapshot files             |

## Styling — StyleX (migrated from Vanilla Extract)

- Per-component styles live in a sibling `Component.stylex.ts` exporting `stylex.create({...})`. Apply with `stylex.props(...)` and spread onto the element.
- **Palette single source of truth is `src/styles/global.css`** `:root` custom properties. `src/styles/tokens.stylex.ts` only _aliases_ them (`var(--color-...)`) into typed `colors`/`theme` vars. Add a new color to the CSS `:root` first, then alias it in `tokens.stylex.ts`.
- `global.css` owns everything StyleX can't express: bare element selectors (`body`, headings, links), `@font-face`, the palette vars. Do not try to move these into StyleX.
- StyleX drops CSS shorthands — use longhands (`paddingLeft` not `padding`, `backgroundImage` + separate `backgroundRepeat` not `background`).
- Wired via `unplugin-stylex/astro` in `astro.config.mjs`; readable debug class names kept outside production (`dev: !isProduction`).

## Content

Blog posts are an Astro content collection in `src/content/blog/` (`.md`/`.mdx`, files starting `_` ignored). Frontmatter schema (`title`, `description`, `pubDate`, optional `heroImage`, `updatedDate`) enforced in `src/content.config.ts`. Retrieve with `getCollection("blog")`.

## E2E visual regression

`e2e-tests/tests/visuals.spec.ts` does full-page screenshot diffs of `/`, `/blog`, `/about` across chromium/firefox/webkit. Snapshots are **platform-specific**: `*-darwin.png` generated locally, `*-linux.png` used in CI. To regenerate linux baselines, run the container (`e2e-tests/docker-compose.yml`, runs `pnpm test -- --update-snapshots`) then `pnpm snapshots:linux`. Config is `e2e-tests/playwright.config.ts` (note `testDir: ./tests` is relative to that folder).

## Conventions & CI

- **ESLint flat config** (`eslint.config.mjs`) uses `perfectionist` recommended-natural — object keys / imports are sorted alphabetically. Keep new objects sorted or lint fails. Also enforces jsdoc, `jsx-a11y` strict, react-hooks, stylex, regexp.
- **Conventional Commits** required — commitlint + husky enforce on commit; PR titles checked (`pr-title.yml`); releases automated via **release-please** (`release-please.yml`). lint-staged runs prettier + eslint on staged files.
- CI (`check-PR.yml`) fans out to `build.yml`, `lint.yml`, `playwright.yml`. Push to `main` triggers release-please → `docker-build.yml` (tags `:staging` and `:<sha>`, promotes to prod on release).
- GitHub Actions are pinned to commit SHAs — keep that when editing workflows.
