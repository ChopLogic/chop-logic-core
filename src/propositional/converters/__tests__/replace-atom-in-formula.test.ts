import { Operator } from "../../../enums";
import type { PropAtom, PropFormula } from "../../../models";
import { replaceAtomInFormula } from "../replace-atom-in-formula";

describe("replaceAtomInFormula", () => {
	describe("single atom formulas", () => {
		it("should replace a single atom with another atom", () => {
			const formula: PropFormula = { operator: Operator.Var, values: ["p"] };
			const atom: PropAtom = ["p"];
			const substitute: PropFormula = {
				operator: Operator.Var,
				values: ["q"],
			};

			const result = replaceAtomInFormula({ formula, atom, substitute });

			expect(result).toEqual({
				operator: Operator.Var,
				values: ["q"],
			});
		});

		it("should replace a single atom with a complex formula", () => {
			const formula: PropFormula = { operator: Operator.Var, values: ["p"] };
			const atom: PropAtom = ["p"];
			const substitute: PropFormula = {
				operator: Operator.Implies,
				values: [
					{ operator: Operator.Var, values: ["q"] },
					{ operator: Operator.Var, values: ["p"] },
				],
			};

			const result = replaceAtomInFormula({ formula, atom, substitute });

			expect(result).toEqual(substitute);
		});

		it("should return the original formula if atom is not present", () => {
			const formula: PropFormula = { operator: Operator.Var, values: ["p"] };
			const atom: PropAtom = ["q"];
			const substitute: PropFormula = {
				operator: Operator.Var,
				values: ["r"],
			};

			const result = replaceAtomInFormula({ formula, atom, substitute });

			expect(result).toEqual(formula);
		});
	});

	describe("simple implication formulas", () => {
		it("should replace atom in simple implication (p => q)", () => {
			const formula: PropFormula = {
				operator: Operator.Implies,
				values: [
					{ operator: Operator.Var, values: ["p"] },
					{ operator: Operator.Var, values: ["q"] },
				],
			};
			const atom: PropAtom = ["q"];
			const substitute: PropFormula = {
				operator: Operator.Var,
				values: ["s"],
			};

			const result = replaceAtomInFormula({ formula, atom, substitute });

			expect(result).toEqual({
				operator: Operator.Implies,
				values: [
					{ operator: Operator.Var, values: ["p"] },
					{ operator: Operator.Var, values: ["s"] },
				],
			});
		});

		it("should replace atom in the left side of implication", () => {
			const formula: PropFormula = {
				operator: Operator.Implies,
				values: [
					{ operator: Operator.Var, values: ["p"] },
					{ operator: Operator.Var, values: ["q"] },
				],
			};
			const atom: PropAtom = ["p"];
			const substitute: PropFormula = {
				operator: Operator.Var,
				values: ["s"],
			};

			const result = replaceAtomInFormula({ formula, atom, substitute });

			expect(result).toEqual({
				operator: Operator.Implies,
				values: [
					{ operator: Operator.Var, values: ["s"] },
					{ operator: Operator.Var, values: ["q"] },
				],
			});
		});
	});

	describe("nested formula structures", () => {
		it("should replace atom in nested implication (p => (q => r))", () => {
			const formula: PropFormula = {
				operator: Operator.Implies,
				values: [
					{ operator: Operator.Var, values: ["p"] },
					{
						operator: Operator.Implies,
						values: [
							{ operator: Operator.Var, values: ["q"] },
							{ operator: Operator.Var, values: ["r"] },
						],
					},
				],
			};
			const atom: PropAtom = ["q"];
			const substitute: PropFormula = {
				operator: Operator.Var,
				values: ["s"],
			};

			const result = replaceAtomInFormula({ formula, atom, substitute });

			expect(result).toEqual({
				operator: Operator.Implies,
				values: [
					{ operator: Operator.Var, values: ["p"] },
					{
						operator: Operator.Implies,
						values: [
							{ operator: Operator.Var, values: ["s"] },
							{ operator: Operator.Var, values: ["r"] },
						],
					},
				],
			});
		});

		it("should replace atom in deeply nested formula", () => {
			const formula: PropFormula = {
				operator: Operator.And,
				values: [
					{
						operator: Operator.Or,
						values: [
							{ operator: Operator.Var, values: ["p"] },
							{ operator: Operator.Var, values: ["q"] },
						],
					},
					{
						operator: Operator.Not,
						values: [{ operator: Operator.Var, values: ["p"] }],
					},
				],
			};
			const atom: PropAtom = ["p"];
			const substitute: PropFormula = {
				operator: Operator.Var,
				values: ["s"],
			};

			const result = replaceAtomInFormula({ formula, atom, substitute });

			expect(result).toEqual({
				operator: Operator.And,
				values: [
					{
						operator: Operator.Or,
						values: [
							{ operator: Operator.Var, values: ["s"] },
							{ operator: Operator.Var, values: ["q"] },
						],
					},
					{
						operator: Operator.Not,
						values: [{ operator: Operator.Var, values: ["s"] }],
					},
				],
			});
		});
	});

	describe("multiple substitutions", () => {
		it("should replace multiple occurrences of the same atom", () => {
			const formula: PropFormula = {
				operator: Operator.And,
				values: [
					{
						operator: Operator.Implies,
						values: [
							{ operator: Operator.Var, values: ["p"] },
							{ operator: Operator.Var, values: ["q"] },
						],
					},
					{
						operator: Operator.Implies,
						values: [
							{ operator: Operator.Var, values: ["p"] },
							{ operator: Operator.Var, values: ["r"] },
						],
					},
				],
			};
			const atom: PropAtom = ["p"];
			const substitute: PropFormula = {
				operator: Operator.Var,
				values: ["s"],
			};

			const result = replaceAtomInFormula({ formula, atom, substitute });

			expect(result).toEqual({
				operator: Operator.And,
				values: [
					{
						operator: Operator.Implies,
						values: [
							{ operator: Operator.Var, values: ["s"] },
							{ operator: Operator.Var, values: ["q"] },
						],
					},
					{
						operator: Operator.Implies,
						values: [
							{ operator: Operator.Var, values: ["s"] },
							{ operator: Operator.Var, values: ["r"] },
						],
					},
				],
			});
		});

		it("should replace atom appearing three times in formula", () => {
			const formula: PropFormula = {
				operator: Operator.And,
				values: [
					{ operator: Operator.Var, values: ["p"] },
					{ operator: Operator.Var, values: ["p"] },
					{ operator: Operator.Var, values: ["p"] },
				],
			};
			const atom: PropAtom = ["p"];
			const substitute: PropFormula = {
				operator: Operator.Var,
				values: ["q"],
			};

			const result = replaceAtomInFormula({ formula, atom, substitute });

			expect(result).toEqual({
				operator: Operator.And,
				values: [
					{ operator: Operator.Var, values: ["q"] },
					{ operator: Operator.Var, values: ["q"] },
					{ operator: Operator.Var, values: ["q"] },
				],
			});
		});
	});

	describe("substitution with complex formulas", () => {
		it("should replace atom with a conjunction formula", () => {
			const formula: PropFormula = {
				operator: Operator.And,
				values: [
					{
						operator: Operator.Implies,
						values: [
							{ operator: Operator.Var, values: ["p"] },
							{ operator: Operator.Var, values: ["q"] },
						],
					},
					{
						operator: Operator.Implies,
						values: [
							{ operator: Operator.Var, values: ["p"] },
							{ operator: Operator.Var, values: ["r"] },
						],
					},
				],
			};
			const atom: PropAtom = ["p"];
			const substitute: PropFormula = {
				operator: Operator.And,
				values: [
					{ operator: Operator.Var, values: ["s"] },
					{ operator: Operator.Var, values: ["t"] },
				],
			};

			const result = replaceAtomInFormula({ formula, atom, substitute });

			expect(result).toEqual({
				operator: Operator.And,
				values: [
					{
						operator: Operator.Implies,
						values: [
							{
								operator: Operator.And,
								values: [
									{ operator: Operator.Var, values: ["s"] },
									{ operator: Operator.Var, values: ["t"] },
								],
							},
							{ operator: Operator.Var, values: ["q"] },
						],
					},
					{
						operator: Operator.Implies,
						values: [
							{
								operator: Operator.And,
								values: [
									{ operator: Operator.Var, values: ["s"] },
									{ operator: Operator.Var, values: ["t"] },
								],
							},
							{ operator: Operator.Var, values: ["r"] },
						],
					},
				],
			});
		});

		it("should replace atom with a negation formula", () => {
			const formula: PropFormula = {
				operator: Operator.Or,
				values: [
					{ operator: Operator.Var, values: ["p"] },
					{ operator: Operator.Var, values: ["q"] },
				],
			};
			const atom: PropAtom = ["p"];
			const substitute: PropFormula = {
				operator: Operator.Not,
				values: [{ operator: Operator.Var, values: ["s"] }],
			};

			const result = replaceAtomInFormula({ formula, atom, substitute });

			expect(result).toEqual({
				operator: Operator.Or,
				values: [
					{
						operator: Operator.Not,
						values: [{ operator: Operator.Var, values: ["s"] }],
					},
					{ operator: Operator.Var, values: ["q"] },
				],
			});
		});

		it("should replace atom with a complex nested formula", () => {
			const formula: PropFormula = {
				operator: Operator.Implies,
				values: [
					{ operator: Operator.Var, values: ["p"] },
					{ operator: Operator.Var, values: ["q"] },
				],
			};
			const atom: PropAtom = ["p"];
			const substitute: PropFormula = {
				operator: Operator.And,
				values: [
					{
						operator: Operator.Or,
						values: [
							{ operator: Operator.Var, values: ["a"] },
							{ operator: Operator.Var, values: ["b"] },
						],
					},
					{
						operator: Operator.Not,
						values: [{ operator: Operator.Var, values: ["c"] }],
					},
				],
			};

			const result = replaceAtomInFormula({ formula, atom, substitute });

			expect(result).toEqual({
				operator: Operator.Implies,
				values: [
					{
						operator: Operator.And,
						values: [
							{
								operator: Operator.Or,
								values: [
									{ operator: Operator.Var, values: ["a"] },
									{ operator: Operator.Var, values: ["b"] },
								],
							},
							{
								operator: Operator.Not,
								values: [{ operator: Operator.Var, values: ["c"] }],
							},
						],
					},
					{ operator: Operator.Var, values: ["q"] },
				],
			});
		});
	});

	describe("edge cases", () => {
		it("should not replace non-matching atoms", () => {
			const formula: PropFormula = {
				operator: Operator.And,
				values: [
					{ operator: Operator.Var, values: ["a"] },
					{ operator: Operator.Var, values: ["b"] },
					{ operator: Operator.Var, values: ["c"] },
				],
			};
			const atom: PropAtom = ["x"];
			const substitute: PropFormula = {
				operator: Operator.Var,
				values: ["y"],
			};

			const result = replaceAtomInFormula({ formula, atom, substitute });

			expect(result).toEqual(formula);
		});

		it("should handle formula with only the target atom and other operators", () => {
			const formula: PropFormula = {
				operator: Operator.Not,
				values: [
					{
						operator: Operator.Implies,
						values: [
							{ operator: Operator.Var, values: ["p"] },
							{ operator: Operator.Var, values: ["q"] },
						],
					},
				],
			};
			const atom: PropAtom = ["p"];
			const substitute: PropFormula = {
				operator: Operator.Var,
				values: ["s"],
			};

			const result = replaceAtomInFormula({ formula, atom, substitute });

			expect(result).toEqual({
				operator: Operator.Not,
				values: [
					{
						operator: Operator.Implies,
						values: [
							{ operator: Operator.Var, values: ["s"] },
							{ operator: Operator.Var, values: ["q"] },
						],
					},
				],
			});
		});

		it("should preserve formula structure when atom is not found in a branch", () => {
			const formula: PropFormula = {
				operator: Operator.Or,
				values: [
					{
						operator: Operator.And,
						values: [
							{ operator: Operator.Var, values: ["a"] },
							{ operator: Operator.Var, values: ["b"] },
						],
					},
					{
						operator: Operator.Implies,
						values: [
							{ operator: Operator.Var, values: ["c"] },
							{ operator: Operator.Var, values: ["d"] },
						],
					},
				],
			};
			const atom: PropAtom = ["a"];
			const substitute: PropFormula = {
				operator: Operator.Var,
				values: ["x"],
			};

			const result = replaceAtomInFormula({ formula, atom, substitute });

			expect(result).toEqual({
				operator: Operator.Or,
				values: [
					{
						operator: Operator.And,
						values: [
							{ operator: Operator.Var, values: ["x"] },
							{ operator: Operator.Var, values: ["b"] },
						],
					},
					{
						operator: Operator.Implies,
						values: [
							{ operator: Operator.Var, values: ["c"] },
							{ operator: Operator.Var, values: ["d"] },
						],
					},
				],
			});
		});
	});

	describe("immutability", () => {
		it("should not mutate the original formula", () => {
			const originalFormula: PropFormula = {
				operator: Operator.Implies,
				values: [
					{ operator: Operator.Var, values: ["p"] },
					{ operator: Operator.Var, values: ["q"] },
				],
			};
			const formulaCopy = JSON.parse(
				JSON.stringify(originalFormula),
			) as PropFormula;
			const atom: PropAtom = ["p"];
			const substitute: PropFormula = {
				operator: Operator.Var,
				values: ["s"],
			};

			replaceAtomInFormula({ formula: originalFormula, atom, substitute });

			expect(originalFormula).toEqual(formulaCopy);
		});

		it("should create a new formula object", () => {
			const formula: PropFormula = {
				operator: Operator.Var,
				values: ["p"],
			};
			const atom: PropAtom = ["p"];
			const substitute: PropFormula = {
				operator: Operator.Var,
				values: ["q"],
			};

			const result = replaceAtomInFormula({ formula, atom, substitute });

			expect(result).not.toBe(formula);
		});
	});

	describe("different operators", () => {
		it("should work with conjunction operator", () => {
			const formula: PropFormula = {
				operator: Operator.And,
				values: [
					{ operator: Operator.Var, values: ["p"] },
					{ operator: Operator.Var, values: ["q"] },
				],
			};
			const atom: PropAtom = ["p"];
			const substitute: PropFormula = {
				operator: Operator.Var,
				values: ["r"],
			};

			const result = replaceAtomInFormula({ formula, atom, substitute });

			expect(result).toEqual({
				operator: Operator.And,
				values: [
					{ operator: Operator.Var, values: ["r"] },
					{ operator: Operator.Var, values: ["q"] },
				],
			});
		});

		it("should work with disjunction operator", () => {
			const formula: PropFormula = {
				operator: Operator.Or,
				values: [
					{ operator: Operator.Var, values: ["p"] },
					{ operator: Operator.Var, values: ["q"] },
				],
			};
			const atom: PropAtom = ["p"];
			const substitute: PropFormula = {
				operator: Operator.Var,
				values: ["r"],
			};

			const result = replaceAtomInFormula({ formula, atom, substitute });

			expect(result).toEqual({
				operator: Operator.Or,
				values: [
					{ operator: Operator.Var, values: ["r"] },
					{ operator: Operator.Var, values: ["q"] },
				],
			});
		});

		it("should work with negation operator", () => {
			const formula: PropFormula = {
				operator: Operator.Not,
				values: [{ operator: Operator.Var, values: ["p"] }],
			};
			const atom: PropAtom = ["p"];
			const substitute: PropFormula = {
				operator: Operator.Var,
				values: ["q"],
			};

			const result = replaceAtomInFormula({ formula, atom, substitute });

			expect(result).toEqual({
				operator: Operator.Not,
				values: [{ operator: Operator.Var, values: ["q"] }],
			});
		});

		it("should work with equivalence operator", () => {
			const formula: PropFormula = {
				operator: Operator.Equiv,
				values: [
					{ operator: Operator.Var, values: ["p"] },
					{ operator: Operator.Var, values: ["q"] },
				],
			};
			const atom: PropAtom = ["p"];
			const substitute: PropFormula = {
				operator: Operator.Var,
				values: ["r"],
			};

			const result = replaceAtomInFormula({ formula, atom, substitute });

			expect(result).toEqual({
				operator: Operator.Equiv,
				values: [
					{ operator: Operator.Var, values: ["r"] },
					{ operator: Operator.Var, values: ["q"] },
				],
			});
		});
	});
});
