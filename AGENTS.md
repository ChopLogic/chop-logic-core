# AGENTS.md

Instructions for AI coding agents working in this repository. Human contributors: see [CONTRIBUTING.md](CONTRIBUTING.md).

## Overview

`chop-logic-core` is a dependency-free TypeScript library for propositional logic: building and tokenizing
formulas, converting and evaluating them, generating truth tables, and constructing proofs in Hilbert-style and
natural-deduction calculi. It is published to npm as ESM + CJS + type declarations.

- Node.js **>= 22** is required (Stryker 10). CI runs on Node 24.
- Toolchain: TypeScript 6 (strict), tsup (build), Biome (lint + format), Jest 30 + ts-jest (tests),
  StrykerJS (mutation testing), TypeDoc (API docs).

## Commands

| Task                         | Command                                                                            |
| ---------------------------- | ---------------------------------------------------------------------------------- |
| Install                      | `npm ci`                                                                           |
| Type check                   | `npm run typecheck`                                                                |
| Lint (errors only, as in CI) | `npm run lint:errors`                                                              |
| Auto-fix lint + format       | `npm run lint:fix`                                                                 |
| All tests (CI mode)          | `npm run test:ci`                                                                  |
| Single file / folder         | `npx jest src/propositional/validators`                                            |
| Coverage                     | `npm run test:coverage`                                                            |
| Build to `lib/`              | `npm run build`                                                                    |
| API docs to `docs/`          | `npm run docs`                                                                     |
| Mutation testing (slow)      | `npm run test:mutation` — scope it: `npx stryker run --mutate src/path/to/file.ts` |

`npm test` starts Jest in **watch mode** — do not use it in non-interactive sessions.

## Project layout

```
src/
  index.ts                 # public entry; re-exports every module below
  enums/                   # Operator, Glyph*, Step, HilbertCalculusRule/Schema, NaturalCalculusRule, PropFormulaCheck
  models/                  # interfaces & types (PropFormula, PropExpression, PropProofStep, truth tables…)
  tokenizer/               # string -> tokens, glyph helpers
  propositional/
    builders/              # createPropFormula, createPropExpression, createOperator, createPropSymbol
    converters/            # formula <-> expression/string, sub-formula & variable extraction
    evaluators/            # calculatePropFormula and operator truth functions
    truth-tables/          # truth assignments and tables
    validators/            # is-*-applicable checks, structural equality, well-formedness
    hilbert-calculus/      # axioms/, rules/, classes/ (HilbertProof, builder), generators/
    natural-calculus/      # rules/, classes/ (NaturalProof, builder), generators/
```

Every folder has an `index.ts` barrel; new public symbols must be exported through the barrels up to `src/index.ts`.

Generated output — never edit by hand: `lib/`, `docs/`, `coverage/`, `reports/`, `.stryker-tmp/`.

## Code conventions

- **One exported function per file**; file name is kebab-case and matches the camelCase function name
  (`is-implication-elimination-applicable.ts` → `isImplicationEliminationApplicable`).
- Propositional types/functions use the `Prop` prefix (`PropFormula`, `extractPropVariables`).
- Formulas are plain data: `{ operator: Operator.Var, values: ["A"] }` for atoms,
  `{ operator: Operator.Implies, values: [A, B] }` for composites. Do not mutate input formulas.
- Use `import type` for type-only imports; use relative imports (no path aliases).
- TypeScript is strict, including `noPropertyAccessFromIndexSignature` and `noImplicitOverride`. Avoid `any`
  and unnecessary `as` casts; prefer type guards such as `isPropAtom`.
- Formatting is Biome's defaults (tabs, double quotes). Run `npm run lint:fix` instead of hand-formatting.
- Every exported symbol has TSDoc with `@param`, `@returns`, `@throws` (when it throws) and `@category <Group>` —
  categories drive TypeDoc navigation, so reuse existing ones (`Validators`, `Hilbert Calculus`, …).
- Rules throw `Error` with a descriptive message when not applicable; validators return `boolean` and never throw.

## Testing

- Tests live next to the code in `__tests__/<file-name>.test.ts`. Jest globals (`describe`, `it`, `expect`) are
  used without imports.
- Cover success paths, every rejection/throw path, and argument-order variants. Mutation score must stay above
  the Stryker `break` threshold (60%), so assert exact values and error messages, not just "truthy".
- Each barrel has an index test (e.g. `src/propositional/__tests__/index.test.ts`,
  `hilbert-calculus/rules/__tests__/index.test.ts`). Add new exports there.

## Checklist: adding an inference rule

Use an existing rule (e.g. implication elimination) as the template.

1. Enums in `src/enums/proof.ts`: add the rule code to `HilbertCalculusRule` / `NaturalCalculusRule`
   (and `HilbertCalculusSchema` for axioms), and a `PropFormulaCheck` entry for the validator.
2. Validator `src/propositional/validators/is-<rule>-applicable.ts`; export it from `validators/index.ts` and
   register it in the map in `validators/validate-prop-formulas.ts`.
3. Rule `src/propositional/<calculus>/rules/<rule>.ts`: call the validator first and throw
   `Error("<Rule name> is not applicable to the given formulas.")` if it fails.
4. Register the rule in the frozen namespace object (`HilbertRules`, `NaturalRules`, or `HilbertAxioms`) in the
   folder's `index.ts`.
5. Handle the new enum value in the `switch` of `<calculus>/generators/generate-*-proof-steps.ts`.
6. Tests for the validator, the rule, the namespace index, and the module index.
7. Add an entry to `CHANGELOG.md`.

## Before you finish

All of these must pass:

```sh
npm run typecheck && npm run lint:errors && npm run test:ci
```

## Git and releases

- Conventional Commits are enforced by commitlint (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`).
- Branch names: `feat/*`, `fix/*`, `release/*`. PRs target `main`.
- Pre-commit hook runs `typecheck` and Biome via lint-staged; do not bypass it with `--no-verify`.
- `CHANGELOG.md` follows Keep a Changelog; versions follow SemVer.
- **Never** run `npm run release:version` (it commits, tags and pushes to `main`) or `npm publish`.
  Releases are done by the maintainer.
