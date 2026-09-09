import type { PropAtom } from "../../models";

/**
 * Type guard to check if a value is a PropAtom.
 * A PropAtom is a tuple with exactly one string element representing an atomic proposition.
 *
 * @param value - The value to check
 * @returns True if the value is a PropAtom
 * @category Validators
 *
 * @example
 * // Returns true for valid PropAtom
 * isPropAtom(['p']); // true
 * isPropAtom(['myVariable']); // true
 *
 * @example
 * // Returns false for invalid values
 * isPropAtom(['p', 'q']); // false - too many elements
 * isPropAtom([]); // false - empty array
 * isPropAtom([123]); // false - not a string
 * isPropAtom({ operator: 'Var', values: ['p'] }); // false - PropFormula, not PropAtom
 */
export function isPropAtom(value: unknown): value is PropAtom {
	return (
		Array.isArray(value) && value.length === 1 && typeof value[0] === "string"
	);
}
