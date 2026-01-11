import { HilbertCalculusRule, HilbertCalculusSchema } from "../../../enums";
import { createPropExpression, createPropFormula } from "../../builders";
import { HilbertProof } from "../classes/hilbert-proof";
import { HilbertProofBuilder } from "../classes/hilbert-proof-builder";

describe("Law of Removal of Double Negation", () => {
	/**
	 * Proof of the law of removal of double negation:
	 * Given: ¬¬p (double negation of p)
	 * Derive: p
	 *
	 * Proof sequence:
	 * 1) ¬¬p (Premise)
	 * 2) (¬p → ¬¬p) → ((¬p → ¬p) → p) (IR)
	 * 3) (¬p → (¬¬p → ¬p)) → ((¬p → ¬¬p) → (¬p → ¬p)) (ID)
	 * 4) ¬p → (¬¬p → ¬p) (II)
	 * 5) (¬p → ¬¬p) → (¬p → ¬p) (IE: 4,3)
	 * 6) ¬¬p → (¬p → ¬¬p) (II)
	 * 7) ¬p → ¬¬p (IE: 1,6)
	 * 8) ¬p → ¬p (IE: 5,7)
	 * 9) (¬p → ¬p) → p (IE: 2,7)
	 * 10) p (IE: 8,9)
	 */
	it("should prove p from premise ¬¬p using HilbertProofBuilder", () => {
		const p = createPropFormula(createPropExpression("p"));
		const notP = createPropFormula(createPropExpression("~p"));
		const notNotP = createPropFormula(createPropExpression("~~p"));
		const conclusion = p;

		const proof = new HilbertProofBuilder(conclusion)
			.addPremise(notNotP)
			.addAxiom({
				formulas: [notP, notNotP, p],
				schema: HilbertCalculusSchema.IR,
			})
			.addAxiom({
				formulas: [notP, notNotP, notP],
				schema: HilbertCalculusSchema.ID,
			})
			.addAxiom({
				formulas: [notP, notNotP],
				schema: HilbertCalculusSchema.II,
			})
			.addDerivedStep({
				formulas: [
					createPropFormula(createPropExpression("(~p => (~~p => ~p))")),
					createPropFormula(
						createPropExpression(
							"((~p => (~~p => ~p)) => ((~p => ~~p) => (~p => ~p)))",
						),
					),
				],
				rule: HilbertCalculusRule.IE,
				derivedFrom: [4, 3],
			})
			.addAxiom({
				formulas: [notNotP, notP],
				schema: HilbertCalculusSchema.II,
			})
			.addDerivedStep({
				formulas: [
					notNotP,
					createPropFormula(createPropExpression("(~~p => (~p => ~~p))")),
				],
				rule: HilbertCalculusRule.IE,
				derivedFrom: [1, 6],
			})
			.addDerivedStep({
				formulas: [
					createPropFormula(
						createPropExpression("((~p => ~~p) => (~p => ~p))"),
					),
					createPropFormula(createPropExpression("(~p => ~~p)")),
				],
				rule: HilbertCalculusRule.IE,
				derivedFrom: [5, 7],
			})
			.addDerivedStep({
				formulas: [
					createPropFormula(
						createPropExpression("((~p => ~~p) => ((~p => ~p) => p))"),
					),
					createPropFormula(createPropExpression("(~p => ~~p)")),
				],
				rule: HilbertCalculusRule.IE,
				derivedFrom: [2, 7],
			})
			.addDerivedStep({
				formulas: [
					createPropFormula(createPropExpression("(~p => ~p)")),
					createPropFormula(createPropExpression("((~p => ~p) => p)")),
				],
				rule: HilbertCalculusRule.IE,
				derivedFrom: [8, 9],
			})
			.build();

		expect(proof.getStepCount()).toBe(10);
		expect(proof.getGoal()).toEqual(conclusion);
		expect(proof.isComplete()).toBe(true);
		expect(proof.getLastStep()?.formula).toEqual(conclusion);
	});

	it("should prove p from premise ¬¬p using HilbertProof class directly", () => {
		const p = createPropFormula(createPropExpression("p"));
		const notP = createPropFormula(createPropExpression("~p"));
		const notNotP = createPropFormula(createPropExpression("~~p"));

		const proof = new HilbertProof(p);

		proof.addPremise(notNotP);
		proof.addAxiom({
			formulas: [notP, notNotP, p],
			schema: HilbertCalculusSchema.IR,
		});
		proof.addAxiom({
			formulas: [notP, notNotP, notP],
			schema: HilbertCalculusSchema.ID,
		});
		proof.addAxiom({
			formulas: [notP, notNotP],
			schema: HilbertCalculusSchema.II,
		});
		proof.addDerivedStep({
			formulas: [
				createPropFormula(createPropExpression("(~p => (~~p => ~p))")),
				createPropFormula(
					createPropExpression(
						"((~p => (~~p => ~p)) => ((~p => ~~p) => (~p => ~p)))",
					),
				),
			],
			rule: HilbertCalculusRule.IE,
			derivedFrom: [4, 3],
		});
		proof.addAxiom({
			formulas: [notNotP, notP],
			schema: HilbertCalculusSchema.II,
		});
		proof.addDerivedStep({
			formulas: [
				notNotP,
				createPropFormula(createPropExpression("(~~p => (~p => ~~p))")),
			],
			rule: HilbertCalculusRule.IE,
			derivedFrom: [1, 6],
		});
		proof.addDerivedStep({
			formulas: [
				createPropFormula(createPropExpression("((~p => ~~p) => (~p => ~p))")),
				createPropFormula(createPropExpression("(~p => ~~p)")),
			],
			rule: HilbertCalculusRule.IE,
			derivedFrom: [5, 7],
		});
		proof.addDerivedStep({
			formulas: [
				createPropFormula(
					createPropExpression("((~p => ~~p) => ((~p => ~p) => p))"),
				),
				createPropFormula(createPropExpression("(~p => ~~p)")),
			],
			rule: HilbertCalculusRule.IE,
			derivedFrom: [2, 7],
		});
		proof.addDerivedStep({
			formulas: [
				createPropFormula(createPropExpression("(~p => ~p)")),
				createPropFormula(createPropExpression("((~p => ~p) => p)")),
			],
			rule: HilbertCalculusRule.IE,
			derivedFrom: [8, 9],
		});

		expect(proof.getStepCount()).toBe(10);
		expect(proof.getGoal()).toEqual(p);
		expect(proof.isComplete()).toBe(true);
		expect(proof.getLastStep()?.formula).toEqual(p);
	});
});
