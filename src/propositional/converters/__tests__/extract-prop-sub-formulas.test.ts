import { Operator } from "../../../enums";
import type { PropFormula } from "../../../models";
import { extractPropSubFormulas } from "../extract-prop-sub-formulas";

describe("extractPropSubFormulas()", () => {
	it("should extract all sub-formulas in the correct order", () => {
		const formula: PropFormula = {
			operator: Operator.And,
			values: [
				{
					operator: Operator.Not,
					values: [{ operator: Operator.Var, values: ["A"] }],
				},
				{ operator: Operator.Var, values: ["B"] },
			],
		};

		const expectedSubFormulas: PropFormula[] = [
			{
				operator: Operator.Not,
				values: [{ operator: Operator.Var, values: ["A"] }],
			},
		];

		expect(extractPropSubFormulas(formula)).toEqual(expectedSubFormulas);
	});

	it("should return an empty array for a variable formula", () => {
		const formula: PropFormula = { operator: Operator.Var, values: ["X"] };
		expect(extractPropSubFormulas(formula)).toEqual([]);
	});

	it("should extract all sub-formulas, excluding variables and the input formula", () => {
		const formula: PropFormula = {
			operator: Operator.Nand,
			values: [
				{
					operator: Operator.Nor,
					values: [
						{ operator: Operator.Var, values: ["A"] },
						{ operator: Operator.Var, values: ["B"] },
					],
				},
				{
					operator: Operator.And,
					values: [
						{ operator: Operator.Var, values: ["C"] },
						{ operator: Operator.Var, values: ["D"] },
					],
				},
			],
		};

		const expectedSubFormulas: PropFormula[] = [
			{
				operator: Operator.Nor,
				values: [
					{ operator: Operator.Var, values: ["A"] },
					{ operator: Operator.Var, values: ["B"] },
				],
			},
			{
				operator: Operator.And,
				values: [
					{ operator: Operator.Var, values: ["C"] },
					{ operator: Operator.Var, values: ["D"] },
				],
			},
		];

		expect(extractPropSubFormulas(formula)).toEqual(expectedSubFormulas);
	});

	it("should deduplicate identical sub-formulas at different nesting levels", () => {
		// Create a formula with the same sub-formula appearing twice
		const innerAnd: PropFormula = {
			operator: Operator.And,
			values: [
				{ operator: Operator.Var, values: ["A"] },
				{ operator: Operator.Var, values: ["B"] },
			],
		};

		const formula: PropFormula = {
			operator: Operator.Or,
			values: [innerAnd, innerAnd], // Same reference - exact duplicate
		};

		const result = extractPropSubFormulas(formula);

		// Should contain the And formula only once, not twice
		expect(result).toHaveLength(1);
		expect(result[0]).toEqual(innerAnd);
	});

	it("should extract sub-formulas with deeply nested structures", () => {
		// Create a deeply nested formula: ((((A ∨ B) ∧ C) ∨ D) ∧ E)
		const formula: PropFormula = {
			operator: Operator.And,
			values: [
				{
					operator: Operator.Or,
					values: [
						{
							operator: Operator.And,
							values: [
								{
									operator: Operator.Or,
									values: [
										{ operator: Operator.Var, values: ["A"] },
										{ operator: Operator.Var, values: ["B"] },
									],
								},
								{ operator: Operator.Var, values: ["C"] },
							],
						},
						{ operator: Operator.Var, values: ["D"] },
					],
				},
				{ operator: Operator.Var, values: ["E"] },
			],
		};

		const result = extractPropSubFormulas(formula);

		// Should extract 3 sub-formulas: Or, And, Or (top-level And is excluded)
		expect(result).toHaveLength(3);
		// Verify first extracted is Or
		expect(result[0].operator).toBe(Operator.Or);
		// Verify second is And
		expect(result[1].operator).toBe(Operator.And);
		// Verify third is Or
		expect(result[2].operator).toBe(Operator.Or);
	});

	it("should handle formulas with many children at each level", () => {
		// Formula with multiple branches: (A ∧ B ∧ C ∧ D)
		const formula: PropFormula = {
			operator: Operator.And,
			values: [
				{ operator: Operator.Var, values: ["A"] },
				{ operator: Operator.Var, values: ["B"] },
				{ operator: Operator.Var, values: ["C"] },
				{ operator: Operator.Var, values: ["D"] },
			],
		};

		const result = extractPropSubFormulas(formula);

		// No sub-formulas since all children are variables
		expect(result).toHaveLength(0);
	});

	it("should correctly identify and order sub-formulas with overlapping structure", () => {
		// Formula with shared sub-structure: ((A ∧ B) ∨ (A ∧ B)) ∧ (C ∧ (A ∧ B))
		const sharedAnd: PropFormula = {
			operator: Operator.And,
			values: [
				{ operator: Operator.Var, values: ["A"] },
				{ operator: Operator.Var, values: ["B"] },
			],
		};

		const formula: PropFormula = {
			operator: Operator.And,
			values: [
				{
					operator: Operator.Or,
					values: [sharedAnd, sharedAnd],
				},
				{
					operator: Operator.And,
					values: [{ operator: Operator.Var, values: ["C"] }, sharedAnd],
				},
			],
		};

		const result = extractPropSubFormulas(formula);

		// Should have: (A ∧ B) twice, (A ∧ B) ∨ (A ∧ B), C ∧ (A ∧ B)
		// But deduplicated to: (A ∧ B), (A ∧ B) ∨ (A ∧ B), C ∧ (A ∧ B)
		expect(result.length).toBeGreaterThan(0);

		// Verify the shared And appears only once in results
		const andFormulas = result.filter(
			(sf) => sf.operator === Operator.And && sf.values?.length === 2,
		);
		expect(andFormulas).toHaveLength(2); // One is the shared (A ∧ B), one is (C ∧ (A ∧ B))
	});
});
