import { Operator } from '../../enums';

/**
 * Computes the logical value of a unary operator applied to an operand.
 *
 * @param operator - The unary operator to evaluate.
 * @param operand - The boolean value of the operand.
 * @returns The computed boolean value after applying the unary operator.
 * @throws {Error} If an unsupported operator is provided.
 */
export function getUnaryOperationValue({ operator, operand }: { operator: Operator; operand: boolean }): boolean {
  switch (operator) {
    case Operator.Var:
      return operand; // A variable simply retains its boolean value.
    case Operator.Not:
      return !operand; // Logical negation.
    default:
      throw new Error(`Operator "${operator}" is not a valid unary operator.`);
  }
}
