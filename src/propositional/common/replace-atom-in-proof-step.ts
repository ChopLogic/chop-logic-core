import type { PropAtom, PropFormula, PropProofStep } from "../../models";
import { convertPropFormulaToExpression } from "../converters/convert-prop-formula-to-expression";
import { convertPropFormulaToString } from "../converters/convert-prop-formula-to-string";
import { replaceAtomInFormula } from "../converters/replace-atom-in-formula";

/**
 * Returns a copy of a formula-based proof step with every occurrence of an atom replaced,
 * and its expression and string view regenerated. The original step is not mutated.
 *
 * Internal helper shared by {@link HilbertProof} and {@link NaturalProof}; not exported publicly.
 *
 * @param step - The proof step to rewrite
 * @param atom - The atomic proposition to replace
 * @param substitute - The formula or atom to substitute
 * @returns The rewritten proof step
 *
 * @category Common
 */
export function replaceAtomInProofStep(
	step: PropProofStep,
	atom: PropAtom,
	substitute: PropFormula | PropAtom,
): PropProofStep {
	const formula = replaceAtomInFormula({
		formula: step.formula,
		atom,
		substitute,
	});

	return {
		...structuredClone(step),
		formula,
		expression: convertPropFormulaToExpression(formula),
		stringView: convertPropFormulaToString(formula),
	};
}
