import { NaturalCalculusRule, Step } from "../../enums";
import type { PropFormula, PropProofStep } from "../../models";
import { createPropExpression } from "../builders/create-prop-expression";
import { convertPropFormulaToExpression } from "../utils/convert-prop-formula-to-expression";
import { convertPropFormulaToString } from "../utils/convert-prop-formula-to-string";
import { conjunctionElimination } from "./conjunction-elimination";
import { conjunctionIntroduction } from "./conjunction-introduction";
import { disjunctionElimination } from "./disjunction-elimination";
import { disjunctionIntroduction } from "./disjunction-introduction";
import { equivalenceElimination } from "./equivalence-elimination";
import { equivalenceIntroduction } from "./equivalence-introduction";
import { implicationElimination } from "./implication-elimination";
import { implicationIntroduction } from "./implication-introduction";
import { negationElimination } from "./negation-elimination";
import { negationIntroduction } from "./negation-introduction";

type DerivedPayload = {
	formulas: PropFormula[];
	rule: NaturalCalculusRule;
	derivedFrom: number[];
};

type BasePayload = {
	formula: PropFormula;
};

interface NaturalProofStepInput<T> {
	index: number;
	level: number;
	assumptionIndex?: number;
	step: T extends Step.Derivation
		? Step.Derivation
		: Exclude<Step, Step.Derivation | Step.Axiom>;
	payload: T extends Step.Derivation ? DerivedPayload : BasePayload;
}

/**
 * Generates a PropProofStep object for use in Natural-style logic derivations.
 * Supports Assumption, Derivation, Premise, Reiteration and Shortcut step types. Applies appropriate
 * rule-based transformations and constructs the string and symbolic expression views.
 * @param input - An object with necessary data for the new proof step.
 * @returns An array of new proof steps based on the input.
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
			payload: input.payload as DerivedPayload,
		});
	}

	return [
		buildBaseStep({
			index,
			level,
			step,
			assumptionIndex,
			payload: input.payload as BasePayload,
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
	payload: DerivedPayload;
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
	payload: BasePayload;
	assumptionIndex?: number;
}): PropProofStep {
	return {
		index,
		level,
		step,
		assumptionIndex,
		formula: payload.formula,
		stringView: convertPropFormulaToString(payload.formula),
		expression: createPropExpression(
			convertPropFormulaToString(payload.formula),
		),
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
