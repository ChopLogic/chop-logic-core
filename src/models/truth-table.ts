// ============== Truth Table Types ==============

/**
 * Maps indices to arrays of truth values.
 * Used for managing truth assignments in evaluations.
 *
 * @category Truth Table Types
 */
export type TruthAssignmentsMap = Map<number, boolean[]>;

/**
 * Represents a single row in a truth table.
 * Maps variable names to their truth values.
 *
 * @category Truth Table Types
 */
export type TruthTableRow = Record<string, boolean>;

/**
 * Complete truth table for a formula.
 * Collection of all possible truth value combinations.
 *
 * @category Truth Table Types
 */
export type TruthTable = TruthTableRow[];
