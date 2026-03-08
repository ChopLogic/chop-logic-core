# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
