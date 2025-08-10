# Contributing to Chop Logic Components

Thank you for your interest in contributing to **Chop Logic**! We appreciate your help in improving and maintaining this
project. Before you get started, please read through the guidelines below to ensure a smooth contribution process.

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
- Environment details (e.g., OS, browser, Chop Logic version).
- Any relevant screenshots or logs.

### Submitting Pull Requests

1. **Fork the repository** and create a new branch:

   ```sh
   git checkout -b feat/your-feature-name
   ```

2. **Make your changes**, ensuring they align with our [coding guidelines](#coding-guidelines).

3. **Run tests** locally before submitting:

   ```sh
   npm run test
   ```

4. **Commit your changes** with a meaningful message
   following [Conventional Commits](https://www.conventionalcommits.org/):

   ```sh
   git commit -m "feat: add new button variant"
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
- Document new features or changes in Storybook if applicable.

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

2. Install dependencies:

   ```sh
   npm install
   ```

3. Make changes and test them.

## Commit Rules

We enforce [Conventional Commits](https://www.conventionalcommits.org/) to maintain a consistent commit history. A
pre-commit hook is set up to lint commit messages, and commits that do not follow the correct format will be rejected.

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

- Follow the project's existing coding style (ESLint and Prettier).
- Write clear and concise documentation.
- Prefer functional components and hooks.
- Use TypeScript for type safety.
- Keep components reusable and accessible.

## Testing

We use **Jest** for testing. Ensure all tests pass before submitting changes:

```sh
npm run test
```

Write tests for new components and features to maintain quality and prevent regressions.

## Folder Structure

| Folder                            | Description                                                                                                   |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `enums/`                          | Contains enums used across the library for consistent values and configuration options.                       |
| `models/`                         | Defines TypeScript interfaces and types representing the core domain models of the library.                   |
| `propositional/`                  | Implementation of Propositional Logic utilities, factories, proof systems, and helper methods.                |
| `propositional/checks/`           | Utility functions for validating and checking well-formed formulas and expressions.                           |
| `propositional/factory/`          | Factory functions for creating logical symbols, operators, expressions, and formulas.                         |
| `propositional/hilbert-calculus/` | Proof rules and axioms based on the Hilbert-style proof system.                                               |
| `propositional/natural-calculus/` | Proof rules for the Natural Deduction proof system.                                                           |
| `propositional/toolkit/`          | Toolkit utilities for working with propositional formulas (truth tables, formula analysis, evaluation, etc.). |
| `tokenizer/`                      | Functions for tokenizing input strings, handling logical symbols, and parsing formulas.                       |

## License

By contributing to Chop Logic, you agree that your contributions will be licensed under the [MIT](LICENSE) license.

---

Thanks for contributing to Chop Logic! Your support helps us create a better, more reusable component library for
everyone.
