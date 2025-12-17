import { implicationElimination } from "./implication-elimination";

/**
 *
 * @namespace
 * @category Hilbert Proof System
 */
export const HilbertRules = Object.freeze({
	IE: implicationElimination,
});
