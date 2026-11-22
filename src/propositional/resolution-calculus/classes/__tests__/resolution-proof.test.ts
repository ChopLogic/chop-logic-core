import { Operator, Step } from "../../../../enums";
import type { PropFormula } from "../../../../models";
import { ResolutionProof } from "../resolution-proof";

const v = (name: string): PropFormula => ({
	operator: Operator.Var,
	values: [name],
});
const not = (formula: PropFormula): PropFormula => ({
	operator: Operator.Not,
	values: [formula],
});
const implies = (a: PropFormula, b: PropFormula): PropFormula => ({
	operator: Operator.Implies,
	values: [a, b],
});

const p = v("p");
const q = v("q");
const r = v("r");

const views = (proof: ResolutionProof) =>
	proof.getSteps().map((step) => step.stringView);

describe("ResolutionProof", () => {
	describe("initial state", () => {
		it("stores the goal and has no steps", () => {
			const proof = new ResolutionProof(r);
			expect(proof.getGoal()).toStrictEqual(r);
			expect(proof.getSteps()).toEqual([]);
			expect(proof.getStepCount()).toBe(0);
			expect(proof.getLastStep()).toBeUndefined();
			expect(proof.getStep(1)).toBeUndefined();
			expect(proof.hasNegatedGoal()).toBe(false);
			expect(proof.hasEmptyClause()).toBe(false);
			expect(proof.isComplete()).toBe(false);
		});

		it("returns a frozen copy of the steps", () => {
			const proof = new ResolutionProof(r);
			proof.addPremise(p);
			const steps = proof.getSteps();
			expect(Object.isFrozen(steps)).toBe(true);
			expect(steps).not.toBe(proof.getSteps());
		});
	});

	describe("addPremise", () => {
		it("adds one step per clause of the premise", () => {
			const proof = new ResolutionProof(r);
			const added = proof.addPremise(implies(implies(p, q), implies(q, r)));

			expect(added.map((step) => step.index)).toEqual([1, 2]);
			expect(added.every((step) => step.step === Step.Premise)).toBe(true);
			expect(added.every((step) => step.comment === "Premise")).toBe(true);
			expect(views(proof)).toEqual(["{p, ¬q, r}", "{¬q, r}"]);
		});

		it("continues the numbering after existing steps", () => {
			const proof = new ResolutionProof(r);
			proof.addPremise(p);
			const [step] = proof.addPremise(implies(p, q));
			expect(step.index).toBe(2);
			expect(proof.getStep(2)).toStrictEqual(step);
			expect(proof.getLastStep()).toStrictEqual(step);
		});

		it("applies the custom comment to every added step", () => {
			const proof = new ResolutionProof(r);
			const added = proof.addPremise(
				{ operator: Operator.And, values: [p, q] },
				"Given",
			);
			expect(added.map((step) => step.comment)).toEqual(["Given", "Given"]);
		});

		it("adds no steps for a premise that folds to a tautology", () => {
			const proof = new ResolutionProof(r);
			expect(
				proof.addPremise({ operator: Operator.Tautology, values: [p, q] }),
			).toEqual([]);
			expect(proof.getStepCount()).toBe(0);
		});

		it("keeps tautological clauses such as {¬p, p}", () => {
			const proof = new ResolutionProof(r);
			proof.addPremise(implies(p, p));
			expect(views(proof)).toEqual(["{¬p, p}"]);
		});
	});

	describe("addPremiseClause", () => {
		it("adds a raw clause and merges duplicate literals", () => {
			const proof = new ResolutionProof(r);
			const step = proof.addPremiseClause([p, not(q), p]);
			expect(step).toEqual({
				index: 1,
				step: Step.Premise,
				clause: [p, not(q)],
				stringView: "{p, ¬q}",
				comment: "Premise",
			});
		});

		it("accepts the empty clause and a custom comment", () => {
			const proof = new ResolutionProof(r);
			const step = proof.addPremiseClause([], "Contradiction");
			expect(step.stringView).toBe("{}");
			expect(step.comment).toBe("Contradiction");
		});

		it("throws for a clause containing a non-literal", () => {
			const proof = new ResolutionProof(r);
			expect(() => proof.addPremiseClause([implies(p, q)])).toThrow(
				"Invalid clause: a clause must contain only literals (p or ¬p).",
			);
			expect(proof.getStepCount()).toBe(0);
		});
	});

	describe("addNegatedGoal", () => {
		it("adds the clauses of the negated goal", () => {
			const proof = new ResolutionProof(implies(p, implies(q, p)));
			const added = proof.addNegatedGoal();

			expect(added.every((step) => step.step === Step.NegatedGoal)).toBe(true);
			expect(added.every((step) => step.comment === "Negated goal")).toBe(true);
			expect(views(proof)).toEqual(["{p}", "{q}", "{¬p}"]);
			expect(proof.hasNegatedGoal()).toBe(true);
		});

		it("applies a custom comment", () => {
			const proof = new ResolutionProof(r);
			const [step] = proof.addNegatedGoal("Refutation");
			expect(step.comment).toBe("Refutation");
		});

		it("throws if called twice", () => {
			const proof = new ResolutionProof(r);
			proof.addNegatedGoal();
			expect(() => proof.addNegatedGoal()).toThrow(
				"The negated goal has already been added to the proof.",
			);
			expect(proof.getStepCount()).toBe(1);
		});
	});

	describe("resolve", () => {
		it("adds the resolvent of two steps", () => {
			const proof = new ResolutionProof(r);
			proof.addPremiseClause([p, q]);
			proof.addPremiseClause([not(q), r]);
			const [step] = proof.resolve(1, 2);

			expect(step).toEqual({
				index: 3,
				step: Step.Derivation,
				clause: [p, r],
				stringView: "{p, r}",
				comment: "R: 1, 2",
				derivedFrom: [1, 2],
				resolvedLiteral: q,
			});
		});

		it("adds every resolvent when there are several complementary pairs", () => {
			const proof = new ResolutionProof(r);
			proof.addPremiseClause([p, q]);
			proof.addPremiseClause([not(p), not(q)]);
			const added = proof.resolve(1, 2, "Both pairs");

			expect(added.map((step) => step.index)).toEqual([3, 4]);
			expect(added.map((step) => step.comment)).toEqual([
				"Both pairs",
				"Both pairs",
			]);
			expect(views(proof).slice(2)).toEqual(["{q, ¬q}", "{p, ¬p}"]);
		});

		it("throws if a step does not exist", () => {
			const proof = new ResolutionProof(r);
			proof.addPremiseClause([p]);
			expect(() => proof.resolve(1, 2)).toThrow(
				"Cannot resolve: step 2 not found in proof",
			);
			expect(() => proof.resolve(0, 1)).toThrow(
				"Cannot resolve: step 0 not found in proof",
			);
		});

		it("throws if resolution is not applicable", () => {
			const proof = new ResolutionProof(r);
			proof.addPremiseClause([p]);
			proof.addPremiseClause([q]);
			expect(() => proof.resolve(1, 2)).toThrow(
				"Resolution is not applicable to the given clauses.",
			);
			expect(proof.getStepCount()).toBe(2);
		});
	});

	describe("reiterateStep", () => {
		it("repeats the clause of an earlier step", () => {
			const proof = new ResolutionProof(r);
			proof.addPremiseClause([p, not(q)]);
			const step = proof.reiterateStep(1);

			expect(step).toEqual({
				index: 2,
				step: Step.Reiteration,
				clause: [p, not(q)],
				stringView: "{p, ¬q}",
				comment: "Reiteration: 1",
				derivedFrom: [1],
			});
			expect(step.clause).not.toBe(proof.getStep(1)?.clause);
		});

		it("uses a custom comment", () => {
			const proof = new ResolutionProof(r);
			proof.addPremiseClause([p]);
			expect(proof.reiterateStep(1, "Again").comment).toBe("Again");
		});

		it("throws if the step does not exist", () => {
			const proof = new ResolutionProof(r);
			expect(() => proof.reiterateStep(1)).toThrow(
				"Cannot reiterate: step 1 not found in proof",
			);
		});
	});

	describe("isComplete", () => {
		it("is false when the empty clause is derived without the negated goal", () => {
			const proof = new ResolutionProof(r);
			proof.addPremiseClause([p]);
			proof.addPremiseClause([not(p)]);
			proof.resolve(1, 2);
			expect(proof.hasEmptyClause()).toBe(true);
			expect(proof.isComplete()).toBe(false);
		});

		it("is false when the negated goal is added but no empty clause exists", () => {
			const proof = new ResolutionProof(r);
			proof.addPremise(p);
			proof.addNegatedGoal();
			expect(proof.isComplete()).toBe(false);
		});

		it("is true when a contradictory premise yields the empty clause", () => {
			const proof = new ResolutionProof(r);
			proof.addPremise({ operator: Operator.And, values: [p, not(p)] });
			proof.addPremise({ operator: Operator.Contradiction, values: [p, q] });
			proof.addNegatedGoal();
			expect(views(proof)).toEqual(["{p}", "{¬p}", "{}", "{¬r}"]);
			expect(proof.isComplete()).toBe(true);
		});
	});

	describe("worked examples", () => {
		it("proves r from p, p ⇒ q and (p ⇒ q) ⇒ (q ⇒ r)", () => {
			const proof = new ResolutionProof(r);
			proof.addPremise(p);
			proof.addPremise(implies(p, q));
			proof.addPremise(implies(implies(p, q), implies(q, r)));
			proof.addNegatedGoal();
			proof.resolve(1, 2);
			proof.resolve(4, 6);
			proof.resolve(5, 7);

			expect(views(proof)).toEqual([
				"{p}",
				"{¬p, q}",
				"{p, ¬q, r}",
				"{¬q, r}",
				"{¬r}",
				"{q}",
				"{r}",
				"{}",
			]);
			expect(proof.getLastStep()?.comment).toBe("R: 5, 7");
			expect(proof.isComplete()).toBe(true);
		});

		it("proves the valid sentence p ⇒ (q ⇒ p) without premises", () => {
			const proof = new ResolutionProof(implies(p, implies(q, p)));
			proof.addNegatedGoal();
			proof.resolve(1, 3);

			expect(views(proof)).toEqual(["{p}", "{q}", "{¬p}", "{}"]);
			expect(proof.isComplete()).toBe(true);
		});

		it("refutes the unsatisfiable set {p, q}, {p, ¬q}, {¬p, q}, {¬p, ¬q}", () => {
			const proof = new ResolutionProof(p);
			proof.addPremiseClause([p, q]);
			proof.addPremiseClause([p, not(q)]);
			proof.addPremiseClause([not(p), q]);
			proof.addPremiseClause([not(p), not(q)]);
			proof.resolve(1, 2);
			proof.resolve(3, 4);
			proof.resolve(5, 6);

			expect(views(proof).slice(4)).toEqual(["{p}", "{¬p}", "{}"]);
			expect(proof.hasEmptyClause()).toBe(true);
		});
	});

	describe("clear", () => {
		it("removes all steps and resets the negated goal", () => {
			const proof = new ResolutionProof(r);
			proof.addPremise(p);
			proof.addNegatedGoal();
			proof.clear();

			expect(proof.getStepCount()).toBe(0);
			expect(proof.hasNegatedGoal()).toBe(false);
			expect(() => proof.addNegatedGoal()).not.toThrow();
		});
	});

	describe("replace", () => {
		it("renames a variable in every clause but not in the goal", () => {
			const proof = new ResolutionProof(r);
			proof.addPremiseClause([p, q]);
			proof.addPremiseClause([not(q), r]);
			proof.resolve(1, 2);
			proof.replace(["q"], ["s"]);

			expect(views(proof)).toEqual(["{p, s}", "{¬s, r}", "{p, r}"]);
			expect(proof.getStep(3)?.resolvedLiteral).toEqual(v("s"));
			expect(proof.getGoal()).toEqual(r);
		});

		it("merges literals that become equal", () => {
			const proof = new ResolutionProof(r);
			proof.addPremiseClause([p, q, not(p)]);
			proof.replace(["q"], ["p"]);

			expect(proof.getStep(1)?.clause).toEqual([p, not(p)]);
			expect(proof.getStep(1)?.stringView).toBe("{p, ¬p}");
		});

		it("leaves steps without the variable unchanged", () => {
			const proof = new ResolutionProof(r);
			proof.addPremiseClause([p]);
			proof.replace(["q"], ["s"]);
			expect(proof.getStep(1)?.clause).toEqual([p]);
			expect(proof.getStep(1)?.resolvedLiteral).toBeUndefined();
		});
	});

	describe("defensive copies", () => {
		const buildIncompleteProof = () => {
			const proof = new ResolutionProof(v("q"));
			proof.addPremise(v("p"));
			proof.addNegatedGoal();
			return proof;
		};

		it("does not let mutating getSteps() results complete the proof", () => {
			const proof = buildIncompleteProof();

			proof.getSteps()[0].clause.length = 0;

			expect(proof.hasEmptyClause()).toBe(false);
			expect(proof.isComplete()).toBe(false);
			expect(views(proof)).toEqual(["{p}", "{¬q}"]);
		});

		it("returns a frozen array from getSteps()", () => {
			expect(Object.isFrozen(buildIncompleteProof().getSteps())).toBe(true);
		});

		it("does not let mutating getStep() and getLastStep() results change the proof", () => {
			const proof = buildIncompleteProof();

			const first = proof.getStep(1);
			const last = proof.getLastStep();
			first?.clause.splice(0);
			last?.clause.splice(0);
			if (last) last.stringView = "{}";

			expect(proof.isComplete()).toBe(false);
			expect(proof.getStep(1)?.clause).toEqual([p]);
			expect(proof.getLastStep()?.clause).toEqual([not(q)]);
			expect(proof.getLastStep()?.stringView).toBe("{¬q}");
		});

		it("does not let mutating steps returned by add methods change the proof", () => {
			const proof = new ResolutionProof(r);
			const [premise] = proof.addPremise(v("p"));
			const clauseStep = proof.addPremiseClause([not(v("p")), v("r")]);
			const [negated] = proof.addNegatedGoal();
			const [resolved] = proof.resolve(1, 2);
			const reiterated = proof.reiterateStep(1);

			for (const step of [premise, clauseStep, negated, resolved, reiterated]) {
				step.clause.length = 0;
				step.comment = "tampered";
			}

			expect(proof.isComplete()).toBe(false);
			expect(views(proof)).toEqual(["{p}", "{¬p, r}", "{¬r}", "{r}", "{p}"]);
			expect(proof.getSteps().map((step) => step.comment)).not.toContain(
				"tampered",
			);
		});

		it("detaches the stored goal from the constructor argument", () => {
			const goal = v("q");
			const proof = new ResolutionProof(goal);

			goal.values = ["p"];
			proof.addPremise(v("p"));
			proof.addNegatedGoal();

			expect(proof.getGoal()).toEqual(q);
			expect(views(proof)).toEqual(["{p}", "{¬q}"]);
		});

		it("does not let mutating getGoal() results change the goal", () => {
			const proof = new ResolutionProof(v("q"));

			proof.getGoal().values = ["p"];

			expect(proof.getGoal()).toEqual(q);
			expect(proof.addNegatedGoal()[0].clause).toEqual([not(q)]);
		});

		it("detaches stored steps from premise inputs", () => {
			const proof = new ResolutionProof(r);
			const formula = v("p");
			const clause = [v("q")];

			proof.addPremise(formula);
			proof.addPremiseClause(clause);
			formula.values = ["x"];
			clause[0].values = ["y"];
			clause.length = 0;

			expect(views(proof)).toEqual(["{p}", "{q}"]);
		});
	});
});
