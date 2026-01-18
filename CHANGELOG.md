# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
