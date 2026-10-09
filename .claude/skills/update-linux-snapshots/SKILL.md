---
name: update-linux-snapshots
description: Update the linux Playwright visual-regression baselines from a GitHub Actions run. Use when the Playwright E2E job fails in CI on screenshot diffs after an intentional visual change, or when the user asks to update/regenerate linux snapshots.
---

# Update linux snapshots

Linux baselines (`e2e-tests/tests/visuals.spec.ts-snapshots/*-linux.png`) cannot be generated on macOS. They are taken from the `*-actual.png` screenshots that the CI Playwright job uploads when a comparison fails.

## Steps

1. Find the PR check run for the branch (the Playwright job runs inside the `PR check` workflow):

   ```sh
   gh run list --workflow check-PR.yml --branch "$(git branch --show-current)" --limit 5
   ```

   The run must have finished with the Playwright job failing; a passing run has no `*-actual.png` files and nothing to update.

2. Download its `playwright-report` artifact into a temporary directory outside the repo. The artifact contains `playwright-report/` and `test-results/`:

   ```sh
   dir="$(mktemp -d)"
   gh run download <run-id> --name playwright-report --dir "$dir"
   ```

   If the user already downloaded and unzipped the artifact from the GitHub UI (typically `~/Downloads/playwright-report`), skip the download and use that directory as `$dir`.

3. Copy the actual screenshots over the linux baselines:

   ```sh
   pnpm snapshots:linux "$dir/test-results"
   ```

   `e2e-tests/linux-update.ts` reads `<dir>/<test-folder>-<browser>/<page>-actual.png` and writes `<page>-<browser>-linux.png`. It exits with `No files found` if the directory has no actual screenshots.

4. Review with `git status` and look at the changed PNGs before committing: only pages and browsers that failed are updated, and each new baseline should show the intended change rather than a real regression.

5. If the same change affects the local baselines, update them too with `pnpm build && pnpm test --update-snapshots` (writes `*-darwin.png`).

Commit the snapshots with a Conventional Commits message, e.g. `test: update linux snapshots`.
