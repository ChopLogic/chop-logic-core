# Contributing to Chop Logic Core

Thank you for your interest in contributing to **Chop Logic**! We appreciate your help in improving and maintaining this
project. Before you get started, please read through the guidelines below to ensure a smooth contribution process.

> Using an AI coding agent? Project instructions for agents are in [AGENTS.md](AGENTS.md).

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How to Contribute](#how-to-contribute)
  - [Reporting Issues](#reporting-issues)
  - [Submitting Pull Requests](#submitting-pull-requests)
  - [Feature Requests](#feature-requests)
- [Development Workflow](#development-workflow)
- [Commit Rules](#commit-rules)
- [Branch Names](#branch-names)
- [Coding Guidelines](#coding-guidelines)
- [Testing](#testing)
- [Folder Structure](#folder-structure)
- [Changelog](#changelog)
- [License](#license)

## Code of Conduct

Please follow our [Code of Conduct](CODE_OF_CONDUCT.md) to ensure a welcoming and inclusive environment for everyone.

## How to Contribute

### Reporting Issues

If you encounter a bug, performance issue, or have a suggestion for improvement, please open an issue in
our [GitHub issue tracker](https://github.com/ChopLogic/chop-logic-core/issues) with the following details:

- A clear and descriptive title.
- Steps to reproduce the issue.
- Expected vs. actual behavior.
- Environment details (e.g., OS, Node.js version, `chop-logic-core` version).
- Any relevant screenshots or logs.

### Submitting Pull Requests

1. **Fork the repository** and create a new branch:

   ```sh
   git checkout -b feat/your-feature-name
   ```

2. **Make your changes**, ensuring they align with our [coding guidelines](#coding-guidelines).

3. **Run the checks** locally before submitting:

   ```sh
   npm run typecheck && npm run lint:errors && npm run test:ci
   ```

4. **Commit your changes** with a meaningful message
   following [Conventional Commits](https://www.conventionalcommits.org/):

   ```sh
   git commit -m "feat: add disjunction elimination rule"
   ```

5. **Push your changes** to your forked repository:

   ```sh
   git push origin feat/your-feature-name
   ```

6. **Open a pull request (PR)** against the `main` branch and fill in the provided PR template.

#### Pull Request Guidelines

- Keep your PR focused and concise.
- Link related issues in your PR description.
- Ensure CI checks pass before requesting a review.
- Document new public APIs with TSDoc comments (they are published via TypeDoc) and add a `CHANGELOG.md` entry.

### Feature Requests

We welcome feature requests! Please open an issue and describe:

- The problem you're trying to solve.
- Potential API suggestions.
- Any related discussion or examples.

## Development Workflow

1. Clone the repository:

   ```sh
   git clone git@github.com:ChopLogic/chop-logic-core.git
   cd chop-logic-core
   ```

2. Install dependencies (requires Node.js 22 or newer; CI uses Node.js 24):

   ```sh
   npm install
   ```

3. Make changes and test them. Useful scripts:

   | Command                 | Purpose                                    |
   | ----------------------- | ------------------------------------------ |
   | `npm run typecheck`     | Type check without emitting                |
   | `npm run lint:fix`      | Lint and format with Biome, applying fixes |
   | `npm run test:ci`       | Run all tests once                         |
   | `npm test`              | Run Jest in watch mode                     |
   | `npm run test:coverage` | Generate a coverage report                 |
   | `npm run test:mutation` | Run Stryker mutation testing (slow)        |
   | `npm run build`         | Build ESM, CJS and type declarations       |
   | `npm run docs`          | Generate API documentation with TypeDoc    |

## Commit Rules

We enforce [Conventional Commits](https://www.conventionalcommits.org/) to maintain a consistent commit history. A
`commit-msg` hook lints commit messages, and commits that do not follow the correct format will be rejected. A
`pre-commit` hook runs type checking and Biome on staged files.

Commit message structure:

```
type(scope): description

Example:
feat: add propositions converter
fix: correct validation logic
```

Allowed commit types:

- `feat`: A new feature (triggers a minor version bump)
- `fix`: A bug fix (triggers a patch version bump)
- `chore`: Routine tasks or dependency updates
- `docs`: Documentation updates
- `refactor`: Code changes that do not fix a bug or add a feature
- `test`: A new unit test added or tests refactored

## Branch Names

Please use the following branch name conventions:

- `feat/*` – For features and updates
- `fix/*` – For fixes and small tasks
- `release/*` – For major releases

## Coding Guidelines

Please follow these guidelines to maintain code consistency:

- Code style is enforced by [Biome](https://biomejs.dev) (lint and format). Run `npm run lint:fix` rather than
  formatting by hand.
- TypeScript runs in strict mode. Avoid `any` and unnecessary type assertions; prefer type guards.
- One exported function per file. File names are kebab-case and match the camelCase function name
  (e.g. `extract-prop-variables.ts` → `extractPropVariables`).
- Export every public symbol through the folder's `index.ts` barrel up to `src/index.ts`.
- Document every exported symbol with TSDoc (`@param`, `@returns`, `@throws`, `@category`). The category is used to
  group the generated API docs.
- Treat formulas as immutable data; do not mutate inputs.

## Testing

We use **Jest** for unit tests and **StrykerJS** for mutation testing. Ensure all checks pass before submitting changes:

```sh
npm run typecheck && npm run lint:errors && npm run test:ci
```

- Place tests in a sibling `__tests__/` folder, named `<file-name>.test.ts`.
- Cover success paths as well as every error/rejection path; assert exact values and error messages.
- When adding public exports, update the corresponding `index.test.ts` export tests.
- Mutation testing runs monthly in CI (the build breaks below a 60% mutation score). To check a single file locally:
  `npx stryker run --mutate src/path/to/file.ts`.

## Folder Structure

All source code lives in `src/`:

| Folder                            | Description                                                                         |
| --------------------------------- | ----------------------------------------------------------------------------------- |
| `enums/`                          | Operators, glyphs, proof step types, rule/schema codes and validation check names.  |
| `models/`                         | TypeScript interfaces and types for formulas, expressions, proofs and truth tables. |
| `tokenizer/`                      | Tokenizing input strings and converting between glyph representations.              |
| `propositional/builders/`         | Factory functions for symbols, operators, expressions and formulas.                 |
| `propositional/converters/`       | Converting formulas to expressions/strings, extracting sub-formulas and variables.  |
| `propositional/evaluators/`       | Evaluating formulas and logical operations.                                         |
| `propositional/truth-tables/`     | Generating truth assignments and truth tables.                                      |
| `propositional/validators/`       | Well-formedness, structural equality and rule applicability checks.                 |
| `propositional/hilbert-calculus/` | Hilbert-style axioms, rules, proof classes and proof generators.                    |
| `propositional/natural-calculus/` | Natural deduction rules, proof classes and proof generators.                        |

## Changelog

All notable changes to this project should be documented in the [CHANGELOG.md](CHANGELOG.md) file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

### Guidelines for Updating This Changelog

When releasing a new version:

1. **Update the version number** in `package.json`
2. **Add a new section** at the top of this file following the format: `## [X.Y.Z] - YYYY-MM-DD`
3. **Categorize changes** using these subsections as appropriate:
   - **Added**: New features or functionality
   - **Changed**: Changes to existing functionality
   - **Deprecated**: Soon-to-be removed features
   - **Removed**: Deleted features or functionality
   - **Fixed**: Bug fixes
   - **Security**: Vulnerability fixes
4. **Keep entries concise** but descriptive, explaining the "what" and "why"
5. **Link to issues/PRs** when available for detailed context
6. **Run `npm run docs`** to regenerate documentation including this changelog reference

## License

By contributing to Chop Logic, you agree that your contributions will be licensed under the [MIT](LICENSE) license.

---

Thanks for contributing to Chop Logic! Your support helps us build better tools for symbolic logic for everyone.
