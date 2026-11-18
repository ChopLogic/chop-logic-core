@AGENTS.md

## Claude Code notes

- Shared settings live in `.claude/settings.json`. Put personal overrides in `.claude/settings.local.json`, which is gitignored.
- A PostToolUse hook runs `biome check --write` on every `.ts`/`.js`/`.json`/`.md` file you edit, so formatting is
  handled automatically. Still run `npm run lint:errors` before finishing.
- Run focused tests with `npx jest <path>` while iterating, and the full `npm run test:ci` at the end.
