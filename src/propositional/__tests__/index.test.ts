import * as propositionalLogic from "../index";

/**
 * Tests for the main propositional logic module exports.
 * Verifies that all expected functions and classes are properly exported.
 */
describe("Propositional Logic Module (index.ts)", () => {
	describe("Builders exports", () => {
		it("should have createOperator function", () => {
			expect(typeof propositionalLogic.createOperator).toBe("function");
		});

		it("should have createPropExpression function", () => {
			expect(typeof propositionalLogic.createPropExpression).toBe("function");
		});

		it("should have createPropFormula function", () => {
			expect(typeof propositionalLogic.createPropFormula).toBe("function");
		});

		it("should have createPropSymbol function", () => {
			expect(typeof propositionalLogic.createPropSymbol).toBe("function");
		});
	});

	describe("Converters exports", () => {
		it("should have convertPropFormulaToExpression function", () => {
			expect(typeof propositionalLogic.convertPropFormulaToExpression).toBe(
				"function",
			);
		});

		it("should have convertPropFormulaToString function", () => {
			expect(typeof propositionalLogic.convertPropFormulaToString).toBe(
				"function",
			);
		});

		it("should have extractPropSubFormulas function", () => {
			expect(typeof propositionalLogic.extractPropSubFormulas).toBe("function");
		});

		it("should have extractPropVariables function", () => {
			expect(typeof propositionalLogic.extractPropVariables).toBe("function");
		});
	});

	describe("Evaluators exports", () => {
		it("should have calculatePropFormula function", () => {
			expect(typeof propositionalLogic.calculatePropFormula).toBe("function");
		});

		it("should have getBinaryOperationValue function", () => {
			expect(typeof propositionalLogic.getBinaryOperationValue).toBe(
				"function",
			);
		});

		it("should have getUnaryOperationValue function", () => {
			expect(typeof propositionalLogic.getUnaryOperationValue).toBe("function");
		});
	});

	describe("Hilbert Calculus exports", () => {
		it("should have buildHilbertProof function", () => {
			expect(typeof propositionalLogic.buildHilbertProof).toBe("function");
		});

		it("should have composeHilbertProof function", () => {
			expect(typeof propositionalLogic.composeHilbertProof).toBe("function");
		});

		it("should have generateHilbertProofStep function", () => {
			expect(typeof propositionalLogic.generateHilbertProofStep).toBe(
				"function",
			);
		});

		it("should have HilbertProof class", () => {
			expect(typeof propositionalLogic.HilbertProof).toBe("function");
		});

		it("should have HilbertProofBuilder class", () => {
			expect(typeof propositionalLogic.HilbertProofBuilder).toBe("function");
		});
	});

	describe("Truth Tables exports", () => {
		it("should have generatePropTruthTable function", () => {
			expect(typeof propositionalLogic.generatePropTruthTable).toBe("function");
		});

		it("should have generateTruthAssignments function", () => {
			expect(typeof propositionalLogic.generateTruthAssignments).toBe(
				"function",
			);
		});
	});

	describe("Validators exports", () => {
		it("should have arePropFormulasStructurallyEqual function", () => {
			expect(typeof propositionalLogic.arePropFormulasStructurallyEqual).toBe(
				"function",
			);
		});

		it("should have isConjunctionEliminationApplicable function", () => {
			expect(typeof propositionalLogic.isConjunctionEliminationApplicable).toBe(
				"function",
			);
		});

		it("should have isConjunctionIntroductionApplicable function", () => {
			expect(
				typeof propositionalLogic.isConjunctionIntroductionApplicable,
			).toBe("function");
		});

		it("should have isDisjunctionEliminationApplicable function", () => {
			expect(typeof propositionalLogic.isDisjunctionEliminationApplicable).toBe(
				"function",
			);
		});

		it("should have isDisjunctionIntroductionApplicable function", () => {
			expect(
				typeof propositionalLogic.isDisjunctionIntroductionApplicable,
			).toBe("function");
		});

		it("should have isEquivalenceEliminationApplicable function", () => {
			expect(typeof propositionalLogic.isEquivalenceEliminationApplicable).toBe(
				"function",
			);
		});

		it("should have isEquivalenceIntroductionApplicable function", () => {
			expect(
				typeof propositionalLogic.isEquivalenceIntroductionApplicable,
			).toBe("function");
		});

		it("should have isImplicationEliminationApplicable function", () => {
			expect(typeof propositionalLogic.isImplicationEliminationApplicable).toBe(
				"function",
			);
		});

		it("should have isImplicationIntroductionApplicable function", () => {
			expect(
				typeof propositionalLogic.isImplicationIntroductionApplicable,
			).toBe("function");
		});

		it("should have isNegationEliminationApplicable function", () => {
			expect(typeof propositionalLogic.isNegationEliminationApplicable).toBe(
				"function",
			);
		});

		it("should have isNegationIntroductionApplicable function", () => {
			expect(typeof propositionalLogic.isNegationIntroductionApplicable).toBe(
				"function",
			);
		});

		it("should have isWellFormedFormula function", () => {
			expect(typeof propositionalLogic.isWellFormedFormula).toBe("function");
		});

		it("should have validatePropFormulas function", () => {
			expect(typeof propositionalLogic.validatePropFormulas).toBe("function");
		});
	});
});
