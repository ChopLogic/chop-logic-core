# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.8.3] - 2026-09-09

### Added

- **Type Guard**:
  - `isPropAtom()`: New type guard function for safely checking if a value is a `PropAtom`. Exported from validators module for consistency with other validation functions.

### Changed

- **TypeScript 6.0 Upgrade**:
  - Upgraded TypeScript from 5.x to 6.0.3
  - Added `"ignoreDeprecations": "6.0"` to tsconfig.json as a temporary workaround for tsup's internal `baseUrl` usage (see [tsup#1388](https://github.com/egoist/tsup/issues/1388))

- **Type Safety Improvements**:
  - Added explicit generic type parameters to `generateHilbertProofSteps` and `generateNaturalProofSteps` calls in proof classes, improving type inference
  - Removed unnecessary type assertions in `isComplete()` methods of `HilbertProof` and `NaturalProof` classes by using proper control flow narrowing
  - Added explicit return types (`SchemaFunction`, `RuleFunction`) to helper functions in proof step generators
  - Replaced inline type checking with `isPropAtom` type guard in `replaceAtomInFormula`

- **Dependency Updates**:
  - `typescript`: ^6.0.3
  - `@biomejs/biome`: ^2.x → ^2.5.12
  - `@commitlint/cli`: ^21.x → ^21.2.2
  - `@commitlint/config-conventional`: ^21.x → ^21.2.2
  - `@jest/globals`: ^30.x → ^30.5.1
  - `@stryker-mutator/core`: ^10.x → ^10.0.0
  - `@stryker-mutator/jest-runner`: ^10.x → ^10.0.0
  - `@types/jest`: ^30.x → ^30.0.0
  - `babel-jest`: ^30.x → ^30.5.1
  - `jest`: ^30.x → ^30.5.1
  - `lint-staged`: ^17.x → ^17.5.0
  - `ts-jest`: ^29.x → ^29.4.12
  - `typedoc`: ^0.28.x → ^0.28.20

- Fixed security vulnerabilities in GitHub Actions

### Removed

- Removed unused type imports (`HilbertBasePayload`, `NaturalBasePayload`, `NaturalProofStepInput`) from proof classes

## [1.8.2] - 2026-04-21

### Changed

- Upgraded TypeScript to v6.
- Updated npm dependencies (dev and tooling libraries).
- Replaced **tsup** with **esbuild** for bundled ESM/CJS output and the TypeScript compiler for declaration emit (`tsconfig.build.json`).

---

## [1.8.1] - 2026-03-08

### Added

- **Mutation Report Badge**: Added mutation testing score badge to README for visibility of mutation coverage status

### Changed

- **Enhanced Test Coverage for Validators**:
  - `isWellFormedFormula()`: Added 16 new edge case tests covering parser behavior, parenthesis handling, and negation placement
  - `isNegationEliminationApplicable()`: Added 11 new tests for double negation validation, structure checking, and multiple formula handling
  - `isNegationIntroductionApplicable()`: Added 12 new tests for antecedent/consequent matching, complex formula structures, and error scenarios
  - `isDisjunctionEliminationApplicable()`: Added 12 new tests covering formula ordering, antecedent matching, and structure validation

- **Enhanced Test Coverage for Converters**:
  - `extractPropSubFormulas()`: Added 4 new tests for deduplication, deep nesting, and overlapping formula structures

- **Enhanced Test Coverage for Hilbert Rules**:
  - `implicationEliminationRule()`: Added 9 new tests for reversed argument order, complex formulas, and detailed error scenarios
  - `getBinaryOperationValue()`: Added 20 new comprehensive truth table tests for all operators, specifically targeting ReversedImplies, Xor, AntiImplies, ReversedAntiImplies, and error handling

### Fixed

- Minor documentation improvements in validator docstrings
- Type annotation consistency across test files

---

## [1.8.0] - 2026-01-22

### Added

- **Mutation Testing Infrastructure**:
  - Integrated Stryker mutation testing framework with Jest
  - Added `mutation-testing.yml` GitHub Actions workflow for scheduled and manual mutation test runs
  - Mutation reports deployed to separate `mutation-reports` branch for historical tracking
  - Automated PR comments with mutation scores for pull requests

- **Formula Manipulation Functions**:
  - `replaceAtomInFormula()`: New utility function for replacing propositional atoms within formulas while maintaining structural integrity

- **Proof Methods**:
  - `replace()` method in `HilbertProof` class: Enables replacement of atoms in proof formulas
  - `replace()` method in `NaturalProof` class: Enables replacement of atoms in proof formulas

### Changed

- Enhanced Jest configuration to exclude `.stryker-tmp/` directory from test runs, preventing duplicate test execution
- Updated `.gitignore` to exclude generated `reports/` directory

---

## [1.7.0] - 2026-01-11

### Added

- **New Hilbert Calculus Rules**:
  - `ImplicationIntroductionRule`: Allows introduction of implications in Hilbert-style calculus, enabling the creation of conditional statements from established facts. Given a proven formula F and an arbitrary formula G, derives G => F.
  - `ImplicationDistributionRule`: Transforms implications of the form F => (G => H) into (F => G) => (F => H), distributing the antecedent across nested implications.
  - `ImplicationReversalRule`: Implements contraposition by transforming ¬F => ¬G into G => F, enabling derivation of equivalent implications with reversed arguments.

- **Integration Tests**:
  - `law-of-contraposition.test.ts`: Integration test demonstrating the Law of Contraposition using the Implication Reversal rule. Tests that the contrapositive (¬q => ¬p) can be converted to the original implication (p => q).

### Changed

- Enhanced test coverage for Hilbert Calculus with comprehensive integration tests utilizing all axiom schemas and rules.

### Technical Details

- All new rules follow the Hilbert-style calculus pattern and are compatible with existing proof builders.
- Comprehensive JSDoc documentation for all new rules with usage examples.
- Full test coverage including both builder pattern and direct class instantiation approaches.

## [1.6.0] - Previous version

- Refer to commit history for details on prior releases.
