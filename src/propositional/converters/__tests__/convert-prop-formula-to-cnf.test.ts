import { Operator } from "../../../enums";
import type { PropFormula } from "../../../models";
import { calculatePropFormula } from "../../evaluators";
import { generateTruthAssignments } from "../../truth-tables";
import { convertPropFormulaToCNF } from "../convert-prop-formula-to-cnf";
import { extractPropVariables } from "../extract-prop-variables";

const p: PropFormula = { operator: Operator.Var, values: ["p"] };
const q: PropFormula = { operator: Operator.Var, values: ["q"] };
const r: PropFormula = { operator: Operator.Var, values: ["r"] };
const s: PropFormula = { operator: Operator.Var, values: ["s"] };

const not = (a: PropFormula): PropFormula => ({
	operator: Operator.Not,
	values: [a],
});
const bin = (
	operator: Operator,
	a: PropFormula,
	b: PropFormula,
): PropFormula => ({ operator, values: [a, b] });
const and = (a: PropFormula, b: PropFormula) => bin(Operator.And, a, b);
const or = (a: PropFormula, b: PropFormula) => bin(Operator.Or, a, b);

function isCNF(formula: PropFormula, belowOr = false): boolean {
	if (formula.operator === Operator.Var) return true;
	if (formula.operator === Operator.Not) {
		return (formula.values[0] as PropFormula).operator === Operator.Var;
	}
	const [left, right] = formula.values as PropFormula[];
	if (formula.operator === Operator.And) {
		return !belowOr && isCNF(left) && isCNF(right);
	}
	if (formula.operator === Operator.Or) {
		return isCNF(left, true) && isCNF(right, true);
	}
	return false;
}

describe("convertPropFormulaToCNF", () => {
	it("keeps formulas already in CNF", () => {
		const formula = and(or(p, not(q)), and(r, or(not(p), s)));
		expect(convertPropFormulaToCNF(formula)).toEqual(formula);
		expect(convertPropFormulaToCNF(p)).toEqual(p);
		expect(convertPropFormulaToCNF(or(p, q))).toEqual(or(p, q));
	});

	it("distributes a disjunction over a right conjunction", () => {
		expect(convertPropFormulaToCNF(or(p, and(q, r)))).toEqual(
			and(or(p, q), or(p, r)),
		);
	});

	it("distributes a disjunction over a left conjunction", () => {
		expect(convertPropFormulaToCNF(or(and(p, q), r))).toEqual(
			and(or(p, r), or(q, r)),
		);
	});

	it("distributes when both operands are conjunctions", () => {
		expect(convertPropFormulaToCNF(or(and(p, q), and(r, s)))).toEqual(
			and(and(or(p, r), or(p, s)), and(or(q, r), or(q, s))),
		);
	});

	it("distributes nested disjunctions", () => {
		// p ∨ (q ∨ (r ∧ s)) → (p ∨ (q ∨ r)) ∧ (p ∨ (q ∨ s))
		expect(convertPropFormulaToCNF(or(p, or(q, and(r, s))))).toEqual(
			and(or(p, or(q, r)), or(p, or(q, s))),
		);
	});

	it("distributes inside conjunctions", () => {
		expect(convertPropFormulaToCNF(and(s, or(p, and(q, r))))).toEqual(
			and(s, and(or(p, q), or(p, r))),
		);
	});

	it("converts the doc example", () => {
		// ¬(g ∧ (r ⇒ f)) → (¬g ∨ r) ∧ (¬g ∨ ¬f)
		const g: PropFormula = { operator: Operator.Var, values: ["g"] };
		const f: PropFormula = { operator: Operator.Var, values: ["f"] };
		const formula = not(and(g, bin(Operator.Implies, r, f)));
		expect(convertPropFormulaToCNF(formula)).toEqual(
			and(or(not(g), r), or(not(g), not(f))),
		);
	});

	it("returns a root constant", () => {
		const bottom = bin(Operator.Contradiction, p, q);
		expect(convertPropFormulaToCNF(and(r, bottom))).toEqual(bottom);
	});

	it.each([
		bin(Operator.Implies, p, bin(Operator.Implies, q, r)),
		bin(Operator.ReversedImplies, or(p, q), and(r, s)),
		bin(Operator.Equiv, bin(Operator.Xor, p, q), r),
		bin(Operator.Nand, bin(Operator.Nor, p, q), bin(Operator.Equiv, r, s)),
		bin(Operator.AntiImplies, p, bin(Operator.ReversedAntiImplies, q, r)),
		not(
			bin(Operator.Xor, bin(Operator.Equiv, p, q), bin(Operator.Implies, r, s)),
		),
		or(bin(Operator.Tautology, p, q), r),
		and(r, or(bin(Operator.Contradiction, p, q), s)),
	])("produces an equivalent CNF formula (case %#)", (formula) => {
		const cnf = convertPropFormulaToCNF(formula);
		const variablesMap = extractPropVariables(formula);
		const isConstant =
			cnf.operator === Operator.Tautology ||
			cnf.operator === Operator.Contradiction;

		expect(isConstant || isCNF(cnf)).toBe(true);

		for (const assignment of generateTruthAssignments(
			variablesMap.size,
		).values()) {
			const expected = calculatePropFormula({
				formula,
				assignment,
				variablesMap,
			});
			const actual = isConstant
				? cnf.operator === Operator.Tautology
				: calculatePropFormula({ formula: cnf, assignment, variablesMap });
			expect(actual).toBe(expected);
		}
	});

	it("does not mutate the input formula", () => {
		const formula = or(and(p, q), not(or(r, s)));
		const copy = structuredClone(formula);
		convertPropFormulaToCNF(formula);
		expect(formula).toEqual(copy);
	});
});
