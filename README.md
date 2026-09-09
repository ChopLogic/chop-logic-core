# Chop Logic Core

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![codecov](https://codecov.io/gh/ChopLogic/chop-logic-core/graph/badge.svg?token=JJKJ54EZDB)](https://codecov.io/gh/ChopLogic/chop-logic-core)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ChopLogic_chop-logic-core&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ChopLogic_chop-logic-core)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-%23FE5196?logo=conventionalcommits&logoColor=white)](https://conventionalcommits.org)
[![Checked with Biome](https://img.shields.io/badge/Checked_with-Biome-60a5fa?style=flat&logo=biome)](https://biomejs.dev)
[![npm](https://github.com/ChopLogic/chop-logic-core/actions/workflows/npm.yml/badge.svg)](https://github.com/ChopLogic/chop-logic-core/actions/workflows/npm.yml)
[![Keep a changelog](https://img.shields.io/badge/Keep%20a%20changelog-1.1.0-E05735?logo=keep-a-changelog&labelColor)](https://keepachangelog.com/en/1.1.0/)
[![Semantic versioning](https://img.shields.io/badge/SemVer-2.0.0-3F4551?logo=semver&labelColor)](https://semver.org/spec/v2.0.0)
[![Mutation testing badge](https://img.shields.io/endpoint?style=flat&url=https%3A%2F%2Fbadge-api.stryker-mutator.io%2Fgithub.com%2FChopLogic%2Fchop-logic-core%2Fmain)](https://dashboard.stryker-mutator.io/reports/github.com/ChopLogic/chop-logic-core/main)

**Chop Logic Core** is a TypeScript library providing core functions for working with **symbolic logic**. It is part of the broader [Chop Logic](https://github.com/ChopLogic) project and offers essential utilities for logic processing and deduction.

## ✨ Features

- 🛠️ Factory methods for building logical symbols, operators, expressions, and well-formed formulas (WFF).
- 🔍 Tools for analyzing formulas:
  - Variable extraction
  - Sub-formula extraction
  - Truth table generation
  - Formula evaluation
  - Well-formedness checks
- ✍️ Inference rules from:
  - Hilbert-style Calculus
  - Natural Deduction Calculus (Introduction & Elimination rules)
- 🧪 Utilities for formula validation and consistency checks.
- 🔣 Tokenizer for parsing and handling logical strings.

## 📦 Installation

You can install `chop-logic-core` via npm:

```sh
npm install chop-logic-core
```

Or using yarn:

```sh
yarn add chop-logic-core
```

## ⚙️ Available Scripts

The following npm scripts are available for development and maintenance:

- **`npm run build`** – Builds both ESM and CJS versions of the library.
- **`npm run prepare`** – Runs build and husky commands.
- **`npm run clean`** – Removes the generated `lib` folder.
- **`npm run format`** – Formats all supported files using Biome.
- **`npm run lint`** – Runs Biome linter to check for code style and quality issues.
- **`npm run lint:errors`** – Shows only error-level diagnostics from Biome (limited to 100).
- **`npm run lint:warnings`** – Shows only warning-level diagnostics from Biome (limited to 100 issues).
- **`npm run lint:fix`** – Automatically fixes Biome issues where possible.
- **`npm run test`** – Runs Jest in watch mode.
- **`npm run test:ci`** – Runs Jest in CI mode, allowing zero tests to pass.
- **`npm run test:coverage`** – Generates a test coverage report.
- **`npm run typecheck`** – Performs a full type check without emitting output.
- **`npm run docs`** – Generates documentation using typedoc.
- **`release:version`** – Bumps the version (`patch`, `minor`, or `major`), commits the change, creates a Git tag, and pushes to `main`. Usage: 
`npm run release:version patch`

## 🔧 Usage

### Creating and Evaluating Formulas

```ts
import {
  createPropExpression,
  createPropFormula,
  calculatePropFormula,
} from "chop-logic-core";

// Create an implication: p → q
const formula = createPropFormula(createPropExpression("p => q"));

// Evaluate the formula with different truth assignments
const result1 = calculatePropFormula(formula, { p: true, q: true }); // true
const result2 = calculatePropFormula(formula, { p: true, q: false }); // false
```

### Building Proofs

```ts
import { buildHilbertProof } from "chop-logic-core";

const proof = buildHilbertProof(goalFormula)
   .addPremise(premiseA, "Given")
   .addAxiom(axiomPayload, "Axiom II")
   .addDerivedStep(derivedPayload, "Modus Ponens")
   .build();

 if (proof.isComplete()) {
   console.log("Proof is valid!");
 }
```

### Truth Table Generation

```ts
import { generatePropTruthTable } from "chop-logic-core";

// Generate a truth table for a formula
const formula = createPropFormula(createPropExpression("(~A & B)"));

const truthTable = generatePropTruthTable(formula);
// Returns all rows with different truth assignments
```

### Validations and Checks

```ts
import {
  isConjunctionIntroductionApplicable,
  PropFormula,
  Operator
} from "chop-logic-core";

const formula1: PropFormula = { operator: Operator.Var, values: ["P"] };
const formula2: PropFormula = { operator: Operator.Var, values: ["Q"] };

// Check if inference rules are applicable to your formulas
const applicable = isConjunctionIntroductionApplicable([formula1, formula2]);
```

For more comprehensive examples and detailed API documentation, visit the [full documentation](https://choplogic.github.io/chop-logic-core).

## 🛠 Contributing

Contributions are welcome! If you find a bug or have an idea for improvement, feel free to open an issue or submit a pull request. Please check the [Contribution guide](CONTRIBUTING.md) for additional info.

1. Fork the repository.
2. Clone your fork.
3. Create a new feature branch.
4. Implement and test your changes.
5. Submit a pull request!

## 📄 License

This project is licensed under **MIT**. See the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **GitHub Repository:** [chop-logic-core](https://github.com/ChopLogic/chop-logic-core)
- **Issue Tracker:** [Report Issues](https://github.com/ChopLogic/chop-logic-core/issues)
- **npm package**: [chop-logic-core](https://www.npmjs.com/package/chop-logic-core)
- **Changelog:** [Version History](CHANGELOG.md)

---

Let's build better logic tools together! 🚀
