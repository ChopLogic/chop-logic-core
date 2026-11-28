# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.10.0] - 2026-11-28

### Added

- **Resolution Calculus** (Robinson-style refutation proofs): a proof of `φ` from `Δ` is a derivation of the empty clause `{}` from the clausal form of `Δ ∪ {¬φ}`.
  - `ResolutionProof` class: `addPremise()` (converts a formula with `convertPropFormulaToClauses()`, one step per clause), `addPremiseClause()`, `addNegatedGoal()`, `resolve()` (adds one step per resolvent when several complementary pairs exist), `reiterateStep()`, `replace()`, `clear()`, `hasNegatedGoal()`, `hasEmptyClause()` and `isComplete()`.
    - `replace()` renames an atom (atom-for-atom only) in the goal and in every clause, so the negated goal steps always stay the negation of the goal. Every derived step is then checked again with `isPropResolvent()`; if a renaming would turn a step into something that is no longer a resolvent of its parent steps (e.g. by merging literals), it throws and leaves the proof unchanged.
    - The goal and all steps are copied on input and output: the constructor, `getGoal()`, `getSteps()`, `getStep()`, `getLastStep()` and the step-adding methods never share objects with the proof's internal state, so mutating them cannot corrupt the proof.
  - `ResolutionProofBuilder` class, `buildResolutionProof()`, `composeResolutionProof()` and `generateResolutionProofSteps()`.
  - `ResolutionRules` namespace with the `R` rule (`resolutionRule()`). Input clauses are treated as sets: duplicate literals are merged before resolving, so each complementary pair is resolved once (`{p, p}` and `{¬p}` derive only `{}`).
- **Validators**: `isPropClause()`, `arePropLiteralsComplementary()`, `isResolutionApplicable()`, `arePropClausesEqual()` (compares clauses as sets of literals) and `isPropResolvent()` (checks that a clause is a resolvent of two clauses, optionally on a given literal).
- **Converters**: `convertPropClauseToString()` (set notation, e.g. `{p, ¬q}`) and `normalizePropClause()` (merges duplicate literals).
- **Enums**: `Step.NegatedGoal` and `ResolutionCalculusRule`.
- **Types**: `ResolutionProofStep`, `ResolutionDerivedPayload`, `ResolutionBasePayload` and `ResolutionProofStepInput`.
- **`BaseProof`** abstract class (new `Common` category): shared base of `HilbertProof`, `NaturalProof` and `ResolutionProof` with the goal, the step list and the accessors `getGoal()`, `getSteps()`, `getStep()`, `getStepCount()`, `getLastStep()`, `clear()` and the abstract `isComplete()`. Also adds the `BaseProofStep` type, which `PropProofStep` and `ResolutionProofStep` now extend.
- **Expression colorizer**: `colorizePropExpression()` sets the optional `PropSymbol.color` using configurable variable and operator colors and a cycling palette for parenthesis nesting.

### Changed

- **Defensive copies in `HilbertProof` and `NaturalProof`**: the constructor and every step-adding method store copies of their inputs, and `getGoal()`, `getSteps()`, `getStep()`, `getLastStep()` and the step-adding methods return copies. Mutating a passed-in formula or a returned step/goal no longer changes the proof (previously it could, e.g., make `isComplete()` report a proof that was never derived). Returned objects are now equal to, but no longer identical (`===`) with, the stored ones.
- **Proof classes refactored**: `HilbertProof`, `NaturalProof` and `ResolutionProof` now extend `BaseProof`, which removes duplicated code; their public API and behaviour are unchanged. `HilbertProof.replace()` and `NaturalProof.replace()` share an internal helper.

### Fixed

- **`isPropLiteral()`** now validates the full shape of a literal: a variable must hold exactly one string atom (checked with `isPropAtom()`), and a negation exactly one such variable. Malformed variables (e.g. `values: []`) are rejected, and `null`/`undefined` formulas or operands return `false` instead of throwing. The new clause validators build on it, so a malformed variable and its negation are never treated as a complementary pair.

## [1.9.0] - 2026-11-19

### Added

- **Clausal Form Conversion** (groundwork for resolution proofs):
  - `convertPropFormulaToClauses()`: Converts an arbitrary formula into an equivalent set of clauses. Duplicate literals within a clause and duplicate clauses are removed; a tautology yields `[]` and a contradiction yields the empty clause `[[]]`.
  - `eliminatePropImplications()`: Rewrites a formula using only `¬`, `∧` and `∨` (handles `⇒`, `⇐`, `⇔`, `⊕`, `↑`, `↓`, `↛`, `↚`) and folds `⊤`/`⊥` constants.
  - `convertPropFormulaToNNF()`: Converts a formula to negation normal form.
  - `convertPropFormulaToCNF()`: Converts a formula to conjunctive normal form.
- **Types**: `PropLiteral` and `PropClause`.
- **Validator**: `isPropLiteral()` checks whether a formula is a variable or a negated variable.

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
