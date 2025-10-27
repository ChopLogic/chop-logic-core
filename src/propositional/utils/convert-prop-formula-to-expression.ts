import { Operator } from "../../enums";
import type { PropExpression, PropFormula } from "../../models";
import { getOperatorGlyph } from "../../tokenizer";
import { createPropSymbol } from "../factory/create-prop-symbol";

export function convertPropFormulaToExpression(
	formula: PropFormula,
): PropExpression {
	const expression: PropExpression = [];
	let position = 0;

	function traverse(node: PropFormula): void {
		const { operator, values } = node;

		if (operator === Operator.Var) {
			expression.push(createPropSymbol(values[0] as string, position++));
			return;
		}

		expression.push(createPropSymbol("(", position++));

		if (operator === Operator.Not) {
			expression.push(createPropSymbol(getOperatorGlyph(operator), position++));
			traverse((values as PropFormula[])[0]);
		} else {
			const [left, right] = values as PropFormula[];
			traverse(left);
			expression.push(createPropSymbol(getOperatorGlyph(operator), position++));
			traverse(right);
		}

		expression.push(createPropSymbol(")", position++));
	}

	traverse(formula);
	return expression;
}
