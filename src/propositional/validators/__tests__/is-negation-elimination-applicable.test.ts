import { Operator } from "../../../enums";
import type { PropFormula } from "../../../models";
import { isNegationEliminationApplicable } from "../is-negation-elimination-applicable";

describe("isNegationEliminationApplicable", () => {
	it("should return true if all formulas contain exactly two negations", () => {
		const formula1: PropFormula = {
			operator: Operator.Not,
			values: [
				{
					operator: Operator.Not,
					values: [{ operator: Operator.Var, values: ["A"] }],
				},
			],
		};

		const formula2: PropFormula = {
			operator: Operator.Not,
			values: [
				{
					operator: Operator.Not,
					values: [{ operator: Operator.Var, values: ["B"] }],
				},
			],
		};

		expect(isNegationEliminationApplicable([formula1, formula2])).toBe(true);
	});

	it("should return false if at least one formula does not have exactly two negations", () => {
		const formula1: PropFormula = {
			operator: Operator.Not,
			values: [
				{
					operator: Operator.Not,
					values: [{ operator: Operator.Var, values: ["A"] }],
				},
			],
		};

		const formula2: PropFormula = {
			operator: Operator.Not,
			values: [{ operator: Operator.Var, values: ["B"] }],
		};

		expect(isNegationEliminationApplicable([formula1, formula2])).toBe(false);
	});

	it("should return true if a formula has more than two negations", () => {
		const formula: PropFormula = {
			operator: Operator.Not,
			values: [
				{
					operator: Operator.Not,
					values: [
						{
							operator: Operator.Not,
							values: [{ operator: Operator.Var, values: ["A"] }],
						},
					],
				},
			],
		};

		expect(isNegationEliminationApplicable([formula])).toBe(true);
	});

	it("should return false if the input array is empty", () => {
		expect(isNegationEliminationApplicable([])).toBe(false);
	});

	it("should return false for a single non-negation formula", () => {
		const formula: PropFormula = {
			operator: Operator.And,
			values: [
				{ operator: Operator.Var, values: ["P"] },
				{ operator: Operator.Var, values: ["Q"] },
			],
		};

		expect(isNegationEliminationApplicable([formula])).toBe(false);
	});

	it("should return false for only one negation (not double)", () => {
		const formula: PropFormula = {
			operator: Operator.Not,
			values: [{ operator: Operator.Var, values: ["A"] }],
		};

		expect(isNegationEliminationApplicable([formula])).toBe(false);
	});

	it("should return false if first negation is followed by non-negation", () => {
		const formula: PropFormula = {
			operator: Operator.Not,
			values: [
				{
					operator: Operator.And,
					values: [
						{ operator: Operator.Var, values: ["A"] },
						{ operator: Operator.Var, values: ["B"] },
					],
				},
			],
		};

		expect(isNegationEliminationApplicable([formula])).toBe(false);
	});

	it("should return false when values is not an array for outer Not", () => {
		const formula: PropFormula = {
			operator: Operator.Not,
			values: "invalid" as unknown as PropFormula[],
		};

		expect(isNegationEliminationApplicable([formula])).toBe(false);
	});

	it("should return false when values has wrong length for outer Not", () => {
		const formula: PropFormula = {
			operator: Operator.Not,
			values: [
				{
					operator: Operator.Not,
					values: [{ operator: Operator.Var, values: ["A"] }],
				},
				{ operator: Operator.Var, values: ["B"] },
			], // Length 2 instead of 1
		};

		expect(isNegationEliminationApplicable([formula])).toBe(false);
	});

	it("should return false when inner formula is missing", () => {
		const formula: PropFormula = {
			operator: Operator.Not,
			values: [], // Empty values array
		};

		expect(isNegationEliminationApplicable([formula])).toBe(false);
	});

	it("should return false when inner formula is not Not operator", () => {
		const formula: PropFormula = {
			operator: Operator.Not,
			values: [
				{
					operator: Operator.Or,
					values: [
						{ operator: Operator.Var, values: ["A"] },
						{ operator: Operator.Var, values: ["B"] },
					],
				},
			],
		};

		expect(isNegationEliminationApplicable([formula])).toBe(false);
	});

	it("should return true for multiple formulas with exactly two negations each", () => {
		const formula1: PropFormula = {
			operator: Operator.Not,
			values: [
				{
					operator: Operator.Not,
					values: [
						{
							operator: Operator.And,
							values: [
								{ operator: Operator.Var, values: ["A"] },
								{ operator: Operator.Var, values: ["B"] },
							],
						},
					],
				},
			],
		};

		const formula2: PropFormula = {
			operator: Operator.Not,
			values: [
				{
					operator: Operator.Not,
					values: [
						{
							operator: Operator.Or,
							values: [
								{ operator: Operator.Var, values: ["C"] },
								{ operator: Operator.Var, values: ["D"] },
							],
						},
					],
				},
			],
		};

		const formula3: PropFormula = {
			operator: Operator.Not,
			values: [
				{
					operator: Operator.Not,
					values: [{ operator: Operator.Var, values: ["E"] }],
				},
			],
		};

		expect(
			isNegationEliminationApplicable([formula1, formula2, formula3]),
		).toBe(true);
	});

	it("should return false when one of multiple formulas fails double negation check", () => {
		const formula1: PropFormula = {
			operator: Operator.Not,
			values: [
				{
					operator: Operator.Not,
					values: [{ operator: Operator.Var, values: ["A"] }],
				},
			],
		};

		const formula2: PropFormula = {
			operator: Operator.Not,
			values: [{ operator: Operator.Var, values: ["B"] }], // Only one negation
		};

		expect(isNegationEliminationApplicable([formula1, formula2])).toBe(false);
	});

	it("should return false for outer Not with non-array values", () => {
		const formula: PropFormula = {
			operator: Operator.Not,
			values: null as unknown as PropFormula[],
		};

		expect(isNegationEliminationApplicable([formula])).toBe(false);
	});

	it("should return false when outer operator is not Not", () => {
		const formula: PropFormula = {
			operator: Operator.And,
			values: [
				{
					operator: Operator.Not,
					values: [{ operator: Operator.Var, values: ["A"] }],
				},
			],
		};

		expect(isNegationEliminationApplicable([formula])).toBe(false);
	});

	it("should handle formulas with complex inner structures", () => {
		const formula: PropFormula = {
			operator: Operator.Not,
			values: [
				{
					operator: Operator.Not,
					values: [
						{
							operator: Operator.Implies,
							values: [
								{ operator: Operator.Var, values: ["A"] },
								{
									operator: Operator.Or,
									values: [
										{ operator: Operator.Var, values: ["B"] },
										{ operator: Operator.Var, values: ["C"] },
									],
								},
							],
						},
					],
				},
			],
		};

		expect(isNegationEliminationApplicable([formula])).toBe(true);
	});
});
