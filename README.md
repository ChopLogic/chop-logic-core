# Chop Logic Core

[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
![Version](https://img.shields.io/npm/v/chop-logic-core)
[![build](https://github.com/SavouryGin/chop-logic-core/actions/workflows/npm.yml/badge.svg)](https://github.com/SavouryGin/chop-logic-core/actions/workflows/npm.yml)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-%23FE5196?logo=conventionalcommits&logoColor=white)](https://conventionalcommits.org)

**Chop Logic Core** is a TypeScript library providing core functions for working with **symbolic logic formulas**. It is part of the broader [Chop Logic](https://github.com/SavouryGin/chop-logic) project and offers essential utilities for propositional logic processing.

🚀 **Current Status:** The library is under active development, but several tested functions are already available for use in third-party projects.

## ✨ Features

- **Propositional Converter** – Converts logic formulas between different formats.
- **Propositional XML Converter** – Converts logic expressions to and from XML.
- **Truth Table Generator** – Generates truth tables for given propositional logic formulas.
- **Propositional Executor** – Evaluates logical formulas against a set of variable values.
- **Propositional Validator** – Checks the syntactic correctness of logic formulas.
- **Propositional Replacer** – Replaces logical symbols with alternative representations.

## 📦 Installation

You can install `chop-logic-core` via npm:

```sh
npm install chop-logic-core
```

Or using yarn:

```sh
yarn add chop-logic-core
```

## 🔧 Usage

```ts
import { convertFormula, generateTruthTable } from 'chop-logic-core';

const formula = 'A ∧ B → C';
const converted = convertFormula(formula);
console.log(converted);

const truthTable = generateTruthTable(formula);
console.table(truthTable);
```

## ⚙️ Available Scripts

The following npm scripts are available for development and maintenance:

- **`npm run clean`** – Removes the generated `lib` folder.
- **`npm run build`** – Builds both ESM and CJS versions of the library.
- **`npm run lint`** – Runs ESLint to check for code quality issues.
- **`npm run lint:fix`** – Runs ESLint with automatic fixes.
- **`npm run test`** – Runs Jest in watch mode.
- **`npm run test:ci`** – Runs Jest in CI mode, allowing zero tests to pass.
- **`npm run coverage`** – Generates a test coverage report.

## 🛠 Contributing

Contributions are welcome! If you find a bug or have an idea for improvement, feel free to open an issue or submit a pull request. Please check the [Countribution guide](CONTRIBUTING.md) for additional info.

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
