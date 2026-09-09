import { Operator } from "../../../enums";
import { getBinaryOperationValue } from "../get-binary-operation-value";

describe("getBinaryOperationValue", () => {
	it("should return correct values for binary logical operators", () => {
		expect(
			getBinaryOperationValue({
				operator: Operator.And,
				leftOperand: true,
				rightOperand: false,
			}),
		).toBe(false);
		expect(
			getBinaryOperationValue({
				operator: Operator.Or,
				leftOperand: true,
				rightOperand: false,
			}),
		).toBe(true);
		expect(
			getBinaryOperationValue({
				operator: Operator.Implies,
				leftOperand: true,
				rightOperand: false,
			}),
		).toBe(false);
		expect(
			getBinaryOperationValue({
				operator: Operator.ReversedImplies,
				leftOperand: true,
				rightOperand: false,
			}),
		).toBe(true);
		expect(
			getBinaryOperationValue({
				operator: Operator.Equiv,
				leftOperand: true,
				rightOperand: true,
			}),
		).toBe(true);
		expect(
			getBinaryOperationValue({
				operator: Operator.Xor,
				leftOperand: true,
				rightOperand: true,
			}),
		).toBe(false);
		expect(
			getBinaryOperationValue({
				operator: Operator.Nand,
				leftOperand: true,
				rightOperand: true,
			}),
		).toBe(false);
		expect(
			getBinaryOperationValue({
				operator: Operator.Nor,
				leftOperand: false,
				rightOperand: false,
			}),
		).toBe(true);
		expect(
			getBinaryOperationValue({
				operator: Operator.AntiImplies,
				leftOperand: true,
				rightOperand: false,
			}),
		).toBe(true);
		expect(
			getBinaryOperationValue({
				operator: Operator.ReversedAntiImplies,
				leftOperand: false,
				rightOperand: true,
			}),
		).toBe(true);
		expect(
			getBinaryOperationValue({
				operator: Operator.Contradiction,
				leftOperand: true,
				rightOperand: true,
			}),
		).toBe(false);
		expect(
			getBinaryOperationValue({
				operator: Operator.Tautology,
				leftOperand: false,
				rightOperand: false,
			}),
		).toBe(true);
	});

	it("should throw an error for non-binary operators", () => {
		expect(() =>
			getBinaryOperationValue({
				operator: Operator.Var,
				leftOperand: true,
				rightOperand: false,
			}),
		).toThrow();
		expect(() =>
			getBinaryOperationValue({
				operator: Operator.Not,
				leftOperand: true,
				rightOperand: false,
			}),
		).toThrow();
	});

	describe("ReversedImplies operator (P <= Q) - all truth combinations", () => {
		it("should return true when P=T, Q=T", () => {
			expect(
				getBinaryOperationValue({
					operator: Operator.ReversedImplies,
					leftOperand: true,
					rightOperand: true,
				}),
			).toBe(true);
		});

		it("should return true when P=T, Q=F", () => {
			expect(
				getBinaryOperationValue({
					operator: Operator.ReversedImplies,
					leftOperand: true,
					rightOperand: false,
				}),
			).toBe(true);
		});

		it("should return false when P=F, Q=T", () => {
			expect(
				getBinaryOperationValue({
					operator: Operator.ReversedImplies,
					leftOperand: false,
					rightOperand: true,
				}),
			).toBe(false);
		});

		it("should return true when P=F, Q=F", () => {
			expect(
				getBinaryOperationValue({
					operator: Operator.ReversedImplies,
					leftOperand: false,
					rightOperand: false,
				}),
			).toBe(true);
		});
	});

	describe("Xor operator (P XOR Q) - all truth combinations", () => {
		it("should return false when P=T, Q=T", () => {
			expect(
				getBinaryOperationValue({
					operator: Operator.Xor,
					leftOperand: true,
					rightOperand: true,
				}),
			).toBe(false);
		});

		it("should return true when P=T, Q=F", () => {
			expect(
				getBinaryOperationValue({
					operator: Operator.Xor,
					leftOperand: true,
					rightOperand: false,
				}),
			).toBe(true);
		});

		it("should return true when P=F, Q=T", () => {
			expect(
				getBinaryOperationValue({
					operator: Operator.Xor,
					leftOperand: false,
					rightOperand: true,
				}),
			).toBe(true);
		});

		it("should return false when P=F, Q=F", () => {
			expect(
				getBinaryOperationValue({
					operator: Operator.Xor,
					leftOperand: false,
					rightOperand: false,
				}),
			).toBe(false);
		});
	});

	describe("AntiImplies operator (P AND NOT Q) - all truth combinations", () => {
		it("should return false when P=T, Q=T", () => {
			expect(
				getBinaryOperationValue({
					operator: Operator.AntiImplies,
					leftOperand: true,
					rightOperand: true,
				}),
			).toBe(false);
		});

		it("should return true when P=T, Q=F", () => {
			expect(
				getBinaryOperationValue({
					operator: Operator.AntiImplies,
					leftOperand: true,
					rightOperand: false,
				}),
			).toBe(true);
		});

		it("should return false when P=F, Q=T", () => {
			expect(
				getBinaryOperationValue({
					operator: Operator.AntiImplies,
					leftOperand: false,
					rightOperand: true,
				}),
			).toBe(false);
		});

		it("should return false when P=F, Q=F", () => {
			expect(
				getBinaryOperationValue({
					operator: Operator.AntiImplies,
					leftOperand: false,
					rightOperand: false,
				}),
			).toBe(false);
		});
	});

	describe("ReversedAntiImplies operator (Q AND NOT P) - all truth combinations", () => {
		it("should return false when P=T, Q=T", () => {
			expect(
				getBinaryOperationValue({
					operator: Operator.ReversedAntiImplies,
					leftOperand: true,
					rightOperand: true,
				}),
			).toBe(false);
		});

		it("should return false when P=T, Q=F", () => {
			expect(
				getBinaryOperationValue({
					operator: Operator.ReversedAntiImplies,
					leftOperand: true,
					rightOperand: false,
				}),
			).toBe(false);
		});

		it("should return true when P=F, Q=T", () => {
			expect(
				getBinaryOperationValue({
					operator: Operator.ReversedAntiImplies,
					leftOperand: false,
					rightOperand: true,
				}),
			).toBe(true);
		});

		it("should return false when P=F, Q=F", () => {
			expect(
				getBinaryOperationValue({
					operator: Operator.ReversedAntiImplies,
					leftOperand: false,
					rightOperand: false,
				}),
			).toBe(false);
		});
	});

	describe("Error handling", () => {
		it("should throw error for Var operator", () => {
			expect(() =>
				getBinaryOperationValue({
					operator: Operator.Var,
					leftOperand: true,
					rightOperand: false,
				}),
			).toThrow('Operator "VAR" is not a binary operator.');
		});

		it("should throw error for Not operator", () => {
			expect(() =>
				getBinaryOperationValue({
					operator: Operator.Not,
					leftOperand: true,
					rightOperand: false,
				}),
			).toThrow('Operator "NOT" is not a binary operator.');
		});

		it("should throw error for unknown operator", () => {
			expect(() =>
				getBinaryOperationValue({
					operator: "UnknownOperator" as unknown as Operator,
					leftOperand: true,
					rightOperand: false,
				}),
			).toThrow('Unknown operator: "UnknownOperator".');
		});
	});

	describe("Comprehensive truth tables for all binary operators", () => {
		it("should correctly evaluate And for all combinations", () => {
			const results = [
				{ left: true, right: true, expected: true },
				{ left: true, right: false, expected: false },
				{ left: false, right: true, expected: false },
				{ left: false, right: false, expected: false },
			];

			for (const { left, right, expected } of results) {
				expect(
					getBinaryOperationValue({
						operator: Operator.And,
						leftOperand: left,
						rightOperand: right,
					}),
				).toBe(expected);
			}
		});

		it("should correctly evaluate Or for all combinations", () => {
			const results = [
				{ left: true, right: true, expected: true },
				{ left: true, right: false, expected: true },
				{ left: false, right: true, expected: true },
				{ left: false, right: false, expected: false },
			];

			for (const { left, right, expected } of results) {
				expect(
					getBinaryOperationValue({
						operator: Operator.Or,
						leftOperand: left,
						rightOperand: right,
					}),
				).toBe(expected);
			}
		});

		it("should correctly evaluate Implies for all combinations", () => {
			const results = [
				{ left: true, right: true, expected: true },
				{ left: true, right: false, expected: false },
				{ left: false, right: true, expected: true },
				{ left: false, right: false, expected: true },
			];

			for (const { left, right, expected } of results) {
				expect(
					getBinaryOperationValue({
						operator: Operator.Implies,
						leftOperand: left,
						rightOperand: right,
					}),
				).toBe(expected);
			}
		});

		it("should correctly evaluate Equiv for all combinations", () => {
			const results = [
				{ left: true, right: true, expected: true },
				{ left: true, right: false, expected: false },
				{ left: false, right: true, expected: false },
				{ left: false, right: false, expected: true },
			];

			for (const { left, right, expected } of results) {
				expect(
					getBinaryOperationValue({
						operator: Operator.Equiv,
						leftOperand: left,
						rightOperand: right,
					}),
				).toBe(expected);
			}
		});

		it("should correctly evaluate Nand for all combinations", () => {
			const results = [
				{ left: true, right: true, expected: false },
				{ left: true, right: false, expected: true },
				{ left: false, right: true, expected: true },
				{ left: false, right: false, expected: true },
			];

			for (const { left, right, expected } of results) {
				expect(
					getBinaryOperationValue({
						operator: Operator.Nand,
						leftOperand: left,
						rightOperand: right,
					}),
				).toBe(expected);
			}
		});

		it("should correctly evaluate Nor for all combinations", () => {
			const results = [
				{ left: true, right: true, expected: false },
				{ left: true, right: false, expected: false },
				{ left: false, right: true, expected: false },
				{ left: false, right: false, expected: true },
			];

			for (const { left, right, expected } of results) {
				expect(
					getBinaryOperationValue({
						operator: Operator.Nor,
						leftOperand: left,
						rightOperand: right,
					}),
				).toBe(expected);
			}
		});

		it("should correctly evaluate Contradiction operator", () => {
			expect(
				getBinaryOperationValue({
					operator: Operator.Contradiction,
					leftOperand: true,
					rightOperand: true,
				}),
			).toBe(false);
			expect(
				getBinaryOperationValue({
					operator: Operator.Contradiction,
					leftOperand: false,
					rightOperand: false,
				}),
			).toBe(false);
		});

		it("should correctly evaluate Tautology operator", () => {
			expect(
				getBinaryOperationValue({
					operator: Operator.Tautology,
					leftOperand: true,
					rightOperand: true,
				}),
			).toBe(true);
			expect(
				getBinaryOperationValue({
					operator: Operator.Tautology,
					leftOperand: false,
					rightOperand: false,
				}),
			).toBe(true);
		});
	});
});
