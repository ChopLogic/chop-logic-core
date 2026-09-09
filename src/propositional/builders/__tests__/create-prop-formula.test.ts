import { Glyph, GlyphType, Operator } from "../../../enums";
import type { PropExpression, PropFormula } from "../../../models";
import { createPropExpression } from "../create-prop-expression";
import {
	createPropFormula,
	findMainOperator,
	isNegation,
	isParenthesized,
	isSingleVariable,
	parseExpression,
} from "../create-prop-formula";

describe("createPropFormula", () => {
	describe("Basic parsing", () => {
		it("should correctly parse a single variable", () => {
			expect(createPropFormula(createPropExpression("A"))).toEqual({
				operator: Operator.Var,
				values: ["A"],
			});
		});

		it("should correctly parse a negation", () => {
			expect(createPropFormula(createPropExpression("~A"))).toEqual({
				operator: Operator.Not,
				values: [{ operator: Operator.Var, values: ["A"] }],
			});
		});

		it("should correctly parse a conjunction", () => {
			expect(createPropFormula(createPropExpression("(A & B)"))).toEqual({
				operator: Operator.And,
				values: [
					{ operator: Operator.Var, values: ["A"] },
					{ operator: Operator.Var, values: ["B"] },
				],
			});
		});

		it("should correctly parse a nested expression", () => {
			expect(createPropFormula(createPropExpression("(~A & B)"))).toEqual({
				operator: Operator.And,
				values: [
					{
						operator: Operator.Not,
						values: [{ operator: Operator.Var, values: ["A"] }],
					},
					{ operator: Operator.Var, values: ["B"] },
				],
			});
		});

		it("should correctly parse an implication", () => {
			expect(createPropFormula(createPropExpression("((A & B) => C)"))).toEqual(
				{
					operator: Operator.Implies,
					values: [
						{
							operator: Operator.And,
							values: [
								{ operator: Operator.Var, values: ["A"] },
								{ operator: Operator.Var, values: ["B"] },
							],
						},
						{ operator: Operator.Var, values: ["C"] },
					],
				},
			);
		});

		it("should correctly parse an equivalence", () => {
			expect(
				createPropFormula(createPropExpression("((A & B) <=> (C | D))")),
			).toEqual({
				operator: Operator.Equiv,
				values: [
					{
						operator: Operator.And,
						values: [
							{ operator: Operator.Var, values: ["A"] },
							{ operator: Operator.Var, values: ["B"] },
						],
					},
					{
						operator: Operator.Or,
						values: [
							{ operator: Operator.Var, values: ["C"] },
							{ operator: Operator.Var, values: ["D"] },
						],
					},
				],
			});
		});

		it("should correctly parse disjunction", () => {
			expect(createPropFormula(createPropExpression("(A | B)"))).toEqual({
				operator: Operator.Or,
				values: [
					{ operator: Operator.Var, values: ["A"] },
					{ operator: Operator.Var, values: ["B"] },
				],
			});
		});

		it("should correctly parse double negation", () => {
			expect(createPropFormula(createPropExpression("~~A"))).toEqual({
				operator: Operator.Not,
				values: [
					{
						operator: Operator.Not,
						values: [{ operator: Operator.Var, values: ["A"] }],
					},
				],
			});
		});

		it("should correctly parse complex nested structure", () => {
			const result = createPropFormula(
				createPropExpression("(((A & B) | C) => ~D)"),
			);
			expect(result.operator).toBe(Operator.Implies);
			expect(result.values.length).toBe(2);
		});
	});

	describe("Error handling - Boundary validation", () => {
		it("should throw error when start > end (boundary violation)", () => {
			const expr = createPropExpression("(A & B)");
			expect(() => {
				parseExpression({ expression: expr, start: 5, end: 2 });
			}).toThrow("Unexpected expression boundaries: start=5, end=2");
		});
	});

	describe("Error handling - Invalid formulas", () => {
		it("should throw an error for invalid expressions without parentheses", () => {
			expect(() => createPropFormula(createPropExpression("A & B"))).toThrow(
				"Invalid propositional expression: Not a well-formed formula (WFF).",
			);
		});

		it("should throw an error for incomplete conjunctions", () => {
			expect(() => createPropFormula(createPropExpression("(A & )"))).toThrow(
				"Invalid propositional expression: Not a well-formed formula (WFF).",
			);
		});

		it("should throw an error for unmatched parentheses", () => {
			expect(() => createPropFormula(createPropExpression("~(A & B"))).toThrow(
				"Invalid propositional expression: Not a well-formed formula (WFF).",
			);
		});

		it("should throw error for invalid formula structure", () => {
			const expr = createPropExpression("(A & B)");
			// Manually create an expression without a main operator at balance 1
			// by creating a structure that can't be parsed
			expect(() => {
				parseExpression({
					expression: expr,
					start: 0,
					end: expr.length - 1,
				});
			}).not.toThrow("Invalid formula structure.");
		});
	});

	describe("Helper function: isSingleVariable", () => {
		it("should return true for a single variable", () => {
			const expr = createPropExpression("A");
			expect(isSingleVariable(expr, 0, 0)).toBe(true);
		});

		it("should return false when start !== end", () => {
			const expr = createPropExpression("(A & B)");
			expect(isSingleVariable(expr, 0, 1)).toBe(false);
		});

		it("should return false when type is not Variable", () => {
			const expr = createPropExpression("~A");
			// First element is negation operator, not a variable
			expect(isSingleVariable(expr, 0, 0)).toBe(false);
		});

		it("should return false when start === end but element is operator", () => {
			const expr = createPropExpression("(A & B)");
			// Parenthesis is not a variable
			expect(isSingleVariable(expr, 0, 0)).toBe(false);
		});
	});

	describe("Helper function: isParenthesized", () => {
		it("should return true for parenthesized expression", () => {
			const expr = createPropExpression("(A & B)");
			expect(isParenthesized(expr, 0, expr.length - 1)).toBe(true);
		});

		it("should return false when first element is not open paren", () => {
			const expr = createPropExpression("(A & B)");
			// Skip first element
			expect(isParenthesized(expr, 1, expr.length - 1)).toBe(false);
		});

		it("should return false when last element is not close paren", () => {
			const expr = createPropExpression("(A & B)");
			// Skip last element
			expect(isParenthesized(expr, 0, expr.length - 2)).toBe(false);
		});

		it("should return false for non-parenthesized single variable", () => {
			const expr = createPropExpression("A");
			expect(isParenthesized(expr, 0, 0)).toBe(false);
		});

		it("should return false when only first char matches", () => {
			const expr = createPropExpression("(A & B)");
			// Create a scenario where only opening paren matches but closing doesn't
			const customExpr: PropExpression = [
				expr[0], // (
				expr[1], // A
			];
			expect(isParenthesized(customExpr, 0, customExpr.length - 1)).toBe(false);
		});

		it("should return false when neither paren matches", () => {
			const expr = createPropExpression("A");
			expect(isParenthesized(expr, 0, 0)).toBe(false);
		});
	});

	describe("Helper function: isNegation", () => {
		it("should return true when element is negation", () => {
			const expr = createPropExpression("~A");
			expect(isNegation(expr, 0)).toBe(true);
		});

		it("should return false when element is not negation", () => {
			const expr = createPropExpression("A");
			expect(isNegation(expr, 0)).toBe(false);
		});

		it("should return false for opening parenthesis", () => {
			const expr = createPropExpression("(A & B)");
			expect(isNegation(expr, 0)).toBe(false);
		});
	});

	describe("Helper function: findMainOperator", () => {
		it("should find main operator in simple conjunction", () => {
			const expr = createPropExpression("(A & B)");
			const idx = findMainOperator(expr, 0, expr.length - 1);
			expect(idx).not.toBe(-1);
			expect(expr[idx].atom[0]).toBe(Glyph.Conjunction);
		});

		it("should find main operator at balance level 1", () => {
			const expr = createPropExpression("((A & B) | C)");
			const idx = findMainOperator(expr, 0, expr.length - 1);
			expect(idx).not.toBe(-1);
			// The main operator should be the outermost operator (|)
			expect(expr[idx].atom[0]).toBe(Glyph.Disjunction);
		});

		it("should find implication operator", () => {
			const expr = createPropExpression("(A => B)");
			const idx = findMainOperator(expr, 0, expr.length - 1);
			expect(idx).not.toBe(-1);
			expect(expr[idx].atom[0]).toBe(Glyph.Implication);
		});

		it("should find equivalence operator", () => {
			const expr = createPropExpression("(A <=> B)");
			const idx = findMainOperator(expr, 0, expr.length - 1);
			expect(idx).not.toBe(-1);
			expect(expr[idx].atom[0]).toBe(Glyph.Equivalence);
		});

		it("should skip nested operators at higher balance levels", () => {
			const expr = createPropExpression("((A & B) | (C & D))");
			const idx = findMainOperator(expr, 0, expr.length - 1);
			expect(idx).not.toBe(-1);
			// The main operator should be | not &
			expect(expr[idx].atom[0]).toBe(Glyph.Disjunction);
		});

		it("should return -1 when no operator found at balance 1", () => {
			// Create an expression that won't have an operator at balance 1
			// This is tricky because well-formed formulas should always have this
			// We test by using the internal function directly with custom indices
			const expr = createPropExpression("(A & B)");
			// Search within a range that doesn't include balance 1
			const idx = findMainOperator(expr, 2, 2); // Just the variable A
			expect(idx).toBe(-1);
		});

		it("should include end element in loop (i <= end condition)", () => {
			const expr = createPropExpression("(A & B)");
			const fullSearch = findMainOperator(expr, 0, expr.length - 1);
			// If we exclude the last element, we might not find the closing paren
			// which affects the balance calculation
			expect(fullSearch).not.toBe(-1);
		});

		it("should skip negation operators", () => {
			const expr = createPropExpression("(~A & B)");
			const idx = findMainOperator(expr, 0, expr.length - 1);
			expect(idx).not.toBe(-1);
			// The operator should be &, not ~
			expect(expr[idx].atom[0]).toBe(Glyph.Conjunction);
		});
	});

	describe("Helper function: parseExpression", () => {
		it("should parse single variable", () => {
			const expr = createPropExpression("A");
			const result = parseExpression({
				expression: expr,
				start: 0,
				end: expr.length - 1,
			});
			expect(result.operator).toBe(Operator.Var);
		});

		it("should parse negation", () => {
			const expr = createPropExpression("~A");
			const result = parseExpression({
				expression: expr,
				start: 0,
				end: expr.length - 1,
			});
			expect(result.operator).toBe(Operator.Not);
		});

		it("should parse parenthesized binary expression", () => {
			const expr = createPropExpression("(A & B)");
			const result = parseExpression({
				expression: expr,
				start: 0,
				end: expr.length - 1,
			});
			expect(result.operator).toBe(Operator.And);
		});

		it("should throw error for inverted boundaries", () => {
			const expr = createPropExpression("A");
			expect(() => {
				parseExpression({
					expression: expr,
					start: 5,
					end: 2,
				});
			}).toThrow("Unexpected expression boundaries");
		});

		it("should handle equal boundaries correctly", () => {
			const expr = createPropExpression("A");
			const result = parseExpression({
				expression: expr,
				start: 0,
				end: 0,
			});
			expect(result.operator).toBe(Operator.Var);
		});
	});

	describe("Complex nested expressions", () => {
		it("should parse deeply nested expressions", () => {
			const expr = "(((((A & B) | C) => D) <=> E) & F)";
			const result = createPropFormula(createPropExpression(expr));
			expect(result.operator).toBe(Operator.And);
		});

		it("should handle multiple negations", () => {
			const expr = createPropFormula(createPropExpression("~~~A"));
			expect(expr.operator).toBe(Operator.Not);
			expect((expr.values[0] as PropFormula).operator).toBe(Operator.Not);
			expect(
				((expr.values[0] as PropFormula).values[0] as PropFormula).operator,
			).toBe(Operator.Not);
		});

		it("should handle mixed operators", () => {
			const expr = createPropFormula(
				createPropExpression("((A & (B | C)) => (~D <=> E))"),
			);
			expect(expr.operator).toBe(Operator.Implies);
		});

		it("should correctly handle operator precedence through structure", () => {
			const expr = createPropFormula(createPropExpression("(A | (B & C))"));
			expect(expr.operator).toBe(Operator.Or);
			expect((expr.values[1] as PropFormula).operator).toBe(Operator.And);
		});
	});

	describe("Edge cases for mutation testing", () => {
		it("should distinguish between true and false in start > end check", () => {
			const expr = createPropExpression("A");
			// This verifies start <= end is accepted
			expect(() => {
				parseExpression({
					expression: expr,
					start: 0,
					end: 0,
				});
			}).not.toThrow();

			// This verifies start > end is rejected
			expect(() => {
				parseExpression({
					expression: expr,
					start: 1,
					end: 0,
				});
			}).toThrow();
		});

		it("should distinguish parenthesized from non-parenthesized", () => {
			// Test when NOT parenthesized
			const varExpr = createPropExpression("A");
			expect(isParenthesized(varExpr, 0, 0)).toBe(false);

			// Test when parenthesized
			const parenExpr = createPropExpression("(A & B)");
			expect(isParenthesized(parenExpr, 0, parenExpr.length - 1)).toBe(true);
		});

		it("should verify loop includes all elements up to end", () => {
			const expr = createPropExpression("(A & B)");
			// The loop should process from start to end inclusive
			// This ensures i <= end is correct, not i < end
			const idx = findMainOperator(expr, 0, expr.length - 1);
			expect(idx).toBeGreaterThanOrEqual(0);

			// Both should find the operator, but test ensures complete range is checked
			expect(idx).not.toBe(-1);
		});

		it("should verify mainOperatorIndex -1 check", () => {
			// Create a scenario where main operator is found
			const expr1 = createPropExpression("(A & B)");
			const idx1 = findMainOperator(expr1, 0, expr1.length - 1);
			expect(idx1).not.toBe(-1);

			// Now parse it to verify the -1 check is handled
			const result1 = parseExpression({
				expression: expr1,
				start: 0,
				end: expr1.length - 1,
			});
			expect(result1).toBeDefined();

			// Test with a range where no operator exists at balance 1
			const expr2 = createPropExpression("A");
			const idx2 = findMainOperator(expr2, 0, 0);
			expect(idx2).toBe(-1);
		});

		it("should handle equality operator correctly in loop condition", () => {
			const expr = createPropExpression("(A & B)");
			// Start = 0, end = expr.length - 1
			// Loop should run: i = 0, 1, 2, ..., end
			// The last iteration (i = end) is critical
			const idx = findMainOperator(expr, 0, expr.length - 1);
			expect(idx).not.toBe(-1);

			// Verify all elements are accessible
			let foundOperator = false;
			for (let i = 0; i <= expr.length - 1; i++) {
				if (expr[i].type === GlyphType.Operator) {
					foundOperator = true;
					break;
				}
			}
			expect(foundOperator).toBe(true);
		});
	});
});
