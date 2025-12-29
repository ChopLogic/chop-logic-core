import { NaturalCalculusRule, Step } from "../../../enums";
import type {
	NaturalBasePayload,
	NaturalDerivedPayload,
	NaturalProofStepInput,
	PropProofStep,
} from "../../../models";
import {
	convertPropFormulaToExpression,
	convertPropFormulaToString,
} from "../../converters";
import { conjunctionElimination } from "../rules/conjunction-elimination";
import { conjunctionIntroduction } from "../rules/conjunction-introduction";
import { disjunctionElimination } from "../rules/disjunction-elimination";
import { disjunctionIntroduction } from "../rules/disjunction-introduction";
import { equivalenceElimination } from "../rules/equivalence-elimination";
import { equivalenceIntroduction } from "../rules/equivalence-introduction";
import { implicationElimination } from "../rules/implication-elimination";
import { implicationIntroduction } from "../rules/implication-introduction";
import { negationElimination } from "../rules/negation-elimination";
import { negationIntroduction } from "../rules/negation-introduction";

/**
 * Generates a PropProofStep object for use in Natural-style logic derivations.
 * Supports Assumption, Derivation, Premise, Reiteration and Shortcut step types. Applies appropriate
 * rule-based transformations and constructs the string and symbolic expression views.
 * @param input - An object with necessary data for the new proof step.
 * @returns An array of new proof steps based on the input.
 * @category Natural Calculus
 */
export function generateNaturalProofSteps<T>(
	input: NaturalProofStepInput<T>,
): PropProofStep[] {
	const { index, level, step, assumptionIndex } = input;

	if (step === Step.Derivation) {
		return buildDerivedSteps({
			index,
			level,
			assumptionIndex,
			payload: input.payload as NaturalDerivedPayload,
		});
	}

	return [
		buildBaseStep({
			index,
			level,
			step,
			assumptionIndex,
			payload: input.payload as NaturalBasePayload,
		}),
	];
}

function buildDerivedSteps({
	index,
	level,
	payload,
	assumptionIndex,
}: {
	index: number;
	level: number;
	payload: NaturalDerivedPayload;
	assumptionIndex?: number;
}): PropProofStep[] {
	const { formulas, rule, derivedFrom } = payload;
	const derivedFormulas = getRuleFunction(rule)(formulas);

	return derivedFormulas.map((formula, idx) => ({
		index: index + idx + 1,
		level,
		step: Step.Derivation,
		formula,
		assumptionIndex,
		stringView: convertPropFormulaToString(formula),
		expression: convertPropFormulaToExpression(formula),
		comment: `${rule}: ${derivedFrom.join(", ")}`,
		derivedFrom,
	}));
}

function buildBaseStep({
	index,
	level,
	step,
	payload,
	assumptionIndex,
}: {
	index: number;
	level: number;
	step: Step;
	payload: NaturalBasePayload;
	assumptionIndex?: number;
}): PropProofStep {
	return {
		index,
		level,
		step,
		assumptionIndex,
		formula: payload.formula,
		stringView: convertPropFormulaToString(payload.formula),
		expression: convertPropFormulaToExpression(payload.formula),
		comment: `${step}`,
	};
}

function getRuleFunction(rule: NaturalCalculusRule) {
	switch (rule) {
		// Introduction rules
		case NaturalCalculusRule.CI:
			return conjunctionIntroduction;
		case NaturalCalculusRule.DI:
			return disjunctionIntroduction;
		case NaturalCalculusRule.II:
			return implicationIntroduction;
		case NaturalCalculusRule.EI:
			return equivalenceIntroduction;
		case NaturalCalculusRule.NI:
			return negationIntroduction;
		// Elimination rules
		case NaturalCalculusRule.CE:
			return conjunctionElimination;
		case NaturalCalculusRule.DE:
			return disjunctionElimination;
		case NaturalCalculusRule.IE:
			return implicationElimination;
		case NaturalCalculusRule.EE:
			return equivalenceElimination;
		case NaturalCalculusRule.NE:
			return negationElimination;
	}
}
