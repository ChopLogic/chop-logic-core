import { resolutionRule } from "./resolution";

/**
 * Namespace containing all inference rules of the Resolution calculus.
 *
 * Available rules:
 * - R: Resolution Principle
 *
 * @namespace
 * @category Resolution Calculus
 */
export const ResolutionRules = Object.freeze({
	R: resolutionRule,
});
