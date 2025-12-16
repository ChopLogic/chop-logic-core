# Functional Proof Builder

The `ProofBuilder` class and related functional utilities provide an alternative functional approach to constructing Hilbert-style proofs, complementing the imperative `HilbertProof` class.

## Overview

Instead of creating a `HilbertProof` instance and calling methods on it directly, you can use the functional builder pattern for cleaner, more composable proof construction:

### Imperative Style (HilbertProof)
```typescript
const proof = new HilbertProof(goal);
proof.addPremise(premise1, "Given");
proof.addAxiom(axiomPayload, "Axiom II");
proof.addDerivedStep(derivedPayload, "Modus Ponens");
```

### Functional Style (ProofBuilder)
```typescript
const proof = buildProof(goal)
  .addPremise(premise1, "Given")
  .addAxiom(axiomPayload, "Axiom II")
  .addDerivedStep(derivedPayload, "Modus Ponens")
  .build();
```

## API Reference

### `buildProof(goal: PropFormula): ProofBuilder`

Creates a new proof builder instance. Provides a fluent API for adding steps.

```typescript
const builder = buildProof(goalFormula)
  .addPremise(premiseA)
  .addPremise(premiseB)
  .build();
```

### `ProofBuilder` Methods

#### `addPremise(formula: PropFormula, comment?: string): ProofBuilder`
Adds a premise (assumption) to the proof and returns the builder for chaining.

```typescript
builder.addPremise(formula, "Given assumption");
```

#### `addAxiom(payload: HilbertAxiomPayload, comment?: string): ProofBuilder`
Adds an axiom step to the proof.

```typescript
builder.addAxiom({
  formulas: [formulaA, formulaB],
  schema: HilbertCalculusSchema.II
}, "Axiom II");
```

#### `addDerivedStep(payload: HilbertDerivedPayload, comment?: string): ProofBuilder`
Adds a derived step using a Hilbert calculus rule.

```typescript
builder.addDerivedStep({
  formulas: [formulaA, formulaB],
  schema: HilbertCalculusSchema.IE,
  derivedFrom: [1, 2]
}, "Modus Ponens");
```

#### `build(): HilbertProof`
Completes the proof construction and returns the `HilbertProof` instance.

```typescript
const proof = builder.build();
```

#### `preview(): HilbertProof`
Returns the current proof without building, allowing inspection during construction.

```typescript
const currentState = builder.preview();
console.log(currentState.getStepCount());
```

#### `buildSteps(stepsFn: (builder: this) => void): ProofBuilder`
Executes a callback function that adds multiple steps. Useful for programmatic construction.

```typescript
builder.buildSteps((b) => {
  b.addPremise(p1);
  b.addPremise(p2);
  b.addAxiom(axiom);
});
```

### `composeProof(goal: PropFormula, ...stepGenerators): HilbertProof`

Composes a proof from multiple step generator functions. Each generator receives the builder and adds steps.

```typescript
const createPremises = (builder: ProofBuilder) => {
  builder.addPremise(p1, "First");
  builder.addPremise(p2, "Second");
};

const createAxioms = (builder: ProofBuilder) => {
  builder.addAxiom(axiomPayload, "Axiom");
};

const proof = composeProof(goal, createPremises, createAxioms);
```

### `extendProof(existingProof: HilbertProof, stepsFn: (builder: ProofBuilder) => void): HilbertProof`

Extends an existing proof by adding more steps.

```typescript
let proof = buildProof(goal1).addPremise(p).build();
proof = extendProof(proof, (builder) => {
  builder.addAxiom(axiomPayload);
});
```

### `buildProofWith(goal: PropFormula, config: ProofBuilderConfig): ProofBuilder`

Creates a customized proof builder with validation configuration.

```typescript
const proof = buildProofWith(goal, {
  validator: (proof) => proof.getStepCount() > 0
})
  .addPremise(p)
  .build();
```

## Usage Examples

### Basic Proof Construction
```typescript
import { buildProof } from "./proof-builder";
import { HilbertCalculusSchema } from "../../enums";

const proof = buildProof(goalFormula)
  .addPremise(premise1, "Given")
  .addPremise(premise2, "Given")
  .addAxiom({
    formulas: [premise1, premise2],
    schema: HilbertCalculusSchema.II
  }, "Axiom II")
  .addDerivedStep({
    formulas: [derivedFormula],
    schema: HilbertCalculusSchema.IE,
    derivedFrom: [1, 2]
  }, "Implication Elimination")
  .build();
```

### Modular Proof Construction
```typescript
import { composeProof, ProofBuilder } from "./proof-builder";

const addBasePremises = (builder: ProofBuilder) => {
  builder.addPremise(p, "Assumption");
  builder.addPremise(q, "Assumption");
};

const addInferences = (builder: ProofBuilder) => {
  builder.addAxiom({
    formulas: [p, q],
    schema: HilbertCalculusSchema.II
  }, "Combine premises");
};

const proof = composeProof(goal, addBasePremises, addInferences);
```

### Programmatic Step Generation
```typescript
const proof = buildProof(goal)
  .buildSteps((builder) => {
    const formulas = [p, q, r];
    for (const formula of formulas) {
      builder.addPremise(formula, `Premise: ${formula}`);
    }
  })
  .build();
```

### Incremental Proof Development
```typescript
let proof = buildProof(goal)
  .addPremise(p, "First attempt")
  .build();

// Later, extend the proof
proof = extendProof(proof, (builder) => {
  builder.addPremise(q, "Additional premise");
  builder.addAxiom(axiomPayload, "New axiom");
});
```

### Proof with Validation
```typescript
const validProof = buildProofWith(goal, {
  validator: (proof) => {
    // Custom validation logic
    return proof.isComplete();
  }
})
  .addPremise(p)
  .addAxiom(axiom)
  .build(); // Throws if validation fails
```

## Benefits of Functional Style

1. **Fluent API**: Chainable method calls create readable, linear proof construction
2. **Composability**: Step generators can be combined and reused
3. **Separation of Concerns**: Proof logic can be modularized into separate functions
4. **Functional Testing**: Step generators can be tested independently
5. **Immutability Pattern**: Building is explicit with the `build()` method
6. **Custom Validation**: Easy to add validation during construction

## Comparison: Imperative vs Functional

### Adding the same steps

**Imperative:**
```typescript
const proof = new HilbertProof(goal);
proof.addPremise(p, "Given");
proof.addAxiom(axiom, "Axiom II");
proof.addDerivedStep(derived, "Derivation");
```

**Functional:**
```typescript
const proof = buildProof(goal)
  .addPremise(p, "Given")
  .addAxiom(axiom, "Axiom II")
  .addDerivedStep(derived, "Derivation")
  .build();
```

### Building from multiple sources

**Imperative:**
```typescript
const proof = new HilbertProof(goal);
// Add premises from one source
premises.forEach(p => proof.addPremise(p));
// Add axioms from another source
axioms.forEach(a => proof.addAxiom(a));
// Add derivations from another source
derivations.forEach(d => proof.addDerivedStep(d));
```

**Functional:**
```typescript
const proof = composeProof(goal,
  (builder) => premises.forEach(p => builder.addPremise(p)),
  (builder) => axioms.forEach(a => builder.addAxiom(a)),
  (builder) => derivations.forEach(d => builder.addDerivedStep(d))
);
```

## Notes

- The functional builders wrap the existing `HilbertProof` class and do not modify it
- All builders return the same `HilbertProof` instances, fully compatible with existing code
- The builders maintain all the validation and semantics of `HilbertProof`
