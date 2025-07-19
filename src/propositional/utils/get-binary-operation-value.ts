import { Operator } from "../../enums";

/**
 * Evaluates the logical value of a binary operation given two boolean operands.
 *
 * @param operator - The logical operator to apply.
 * @param leftOperand - The boolean value of the left operand.
 * @param rightOperand - The boolean value of the right operand.
 * @returns The result of applying the operator to the operands.
 * @throws {Error} If the operator is not a binary operator.
 */
export function getBinaryOperationValue({
	operator,
	leftOperand,
	rightOperand,
}: {
	operator: Operator;
	leftOperand: boolean;
	rightOperand: boolean;
}): boolean {
	switch (operator) {
		case Operator.And:
			return leftOperand && rightOperand;
		case Operator.Or:
			return leftOperand || rightOperand;
		case Operator.Implies:
			return !leftOperand || rightOperand;
		case Operator.ReversedImplies:
			return !rightOperand || leftOperand;
		case Operator.Equiv:
			return leftOperand === rightOperand;
		case Operator.Xor:
			return leftOperand !== rightOperand;
		case Operator.Nand:
			return !(leftOperand && rightOperand);
		case Operator.Nor:
			return !(leftOperand || rightOperand);
		case Operator.AntiImplies:
			return leftOperand && !rightOperand;
		case Operator.ReversedAntiImplies:
			return rightOperand && !leftOperand;
		case Operator.Contradiction:
			return false;
		case Operator.Tautology:
			return true;
		case Operator.Var:
		case Operator.Not:
			throw new Error(`Operator "${operator}" is not a binary operator.`);
		default:
			throw new Error(`Unknown operator: "${operator}".`);
	}
}
