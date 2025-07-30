# Chop Logic Core

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![codecov](https://codecov.io/gh/SavouryGin/chop-logic-core/graph/badge.svg?token=52BX0AMDQQ)](https://codecov.io/gh/SavouryGin/chop-logic-core)
[![npm build](https://github.com/SavouryGin/chop-logic-core/actions/workflows/npm.yml/badge.svg)](https://github.com/SavouryGin/chop-logic-core/actions/workflows/npm.yml)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-%23FE5196?logo=conventionalcommits&logoColor=white)](https://conventionalcommits.org)
[![Checked with Biome](https://img.shields.io/badge/Checked_with-Biome-60a5fa?style=flat&logo=biome)](https://biomejs.dev)

**Chop Logic Core** is a TypeScript library providing core functions for working with **symbolic logic**. It is part of the broader [Chop Logic](https://github.com/users/SavouryGin/projects/1) project and offers essential utilities for logic processing and deduction.

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

- **`npm run build`** – Build both ESM and CJS versions of the library.
- **`npm run prepare`** – Run build an husky commands.
- **`npm run clean`** – Remove the generated `lib` folder.
- **`npm run check`** – Run [Biome](https://biomejs.dev/) to check for code quality and formatting issues.
- **`npm run format`** – Format all files.
- **`npm run fix`** – Format, lint, and organize imports of all files.
- **`npm run test`** – Run Jest in watch mode.
- **`npm run test:ci`** – Run Jest in CI mode, allowing zero tests to pass.
- **`npm run coverage`** – Generate a test coverage report.

## 🔧 Usage

```ts
import { ChopLogicCore } from 'chop-logic-core';

const { PropositionalFactory, PropositionalUtils, HilbertCalculus } = ChopLogicCore;
const { createExpression, createFormula } = PropositionalFactory;
const { generateTT, convertToString } = PropositionalUtils;

const expression = createExpression('((A => B) & ~C)');
const formula = createFormula(expression);
const truthTable = generateTT(formula);

const A = createFormula(createExpression('A'));
const implicationAB = createFormula(createExpression('(A => B)'));

const consequent = HilbertCalculus.IE([implicationAB, A]);

const stringView = convertToString(consequent);
```

## 🛠 Contributing

Contributions are welcome! If you find a bug or have an idea for improvement, feel free to open an issue or submit a pull request. Please check the [Contribution guide](CONTRIBUTING.md) for additional info.

1. Fork the repository.
2. Clone your fork.
3. Create a new feature branch.
4. Implement and test your changes.
5. Submit a pull request!

## 📄 License

This project is licensed under **LGPL-3.0-or-later**. See the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **GitHub Repository:** [chop-logic-core](https://github.com/SavouryGin/chop-logic-core)
- **Issue Tracker:** [Report Issues](https://github.com/SavouryGin/chop-logic-core/issues)
- **npm package**: [chop-logic-core](https://www.npmjs.com/package/chop-logic-core)

---

Let's build better logic tools together! 🚀
