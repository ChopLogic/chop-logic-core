import {
	HilbertCalculusRule,
	HilbertCalculusSchema,
	Step,
} from "../../../enums";
import type {
	HilbertAxiomPayload,
	HilbertBasePayload,
	HilbertDerivedPayload,
	HilbertProofStepInput,
	PropProofStep,
} from "../../../models";
import { convertPropFormulaToExpression } from "../../converters/convert-prop-formula-to-expression";
import { convertPropFormulaToString } from "../../converters/convert-prop-formula-to-string";
import { implicationDistributionSchema } from "../axioms/implication-distribution";
import { implicationIntroductionSchema } from "../axioms/implication-introduction";
import { implicationReversalSchema } from "../axioms/implication-reversal";
import { implicationDistributionRule } from "../rules/implication-distribution";
import { implicationEliminationRule } from "../rules/implication-elimination";
import { implicationIntroductionRule } from "../rules/implication-introduction";
import { implicationReversalRule } from "../rules/implication-reversal";

/**
 * Generates a PropProofStep object for use in Hilbert-style logic derivations.
 * Supports Axiom, Derivation, Premise, Reiteration and Shortcut step types. Applies appropriate
 * schema-based transformations and constructs the string and symbolic expression views.
 * @param input - An object with necessary data for the new proof step.
 * @returns A new proof step based on the input.
 * @category Hilbert Calculus
 */
export function generateHilbertProofSteps<T>(
	input: HilbertProofStepInput<T>,
): PropProofStep[] {
	const { index, step } = input;

	if (step === Step.Derivation) {
		return buildDerivedSteps(index, input.payload as HilbertDerivedPayload);
	}

	if (step === Step.Axiom) {
		return buildAxiomStep(index, input.payload as HilbertAxiomPayload);
	}

	return buildBaseStep(index, step, input.payload as HilbertBasePayload);
}

function buildDerivedSteps(
	index: number,
	payload: HilbertDerivedPayload,
): PropProofStep[] {
	const { formulas, rule, derivedFrom } = payload;
	const derivedFormulas = getRuleFunction(rule)(formulas);

	return derivedFormulas.map((formula, derivedIndex) => {
		return {
			index: index + derivedIndex,
			step: Step.Derivation,
			formula,
			stringView: convertPropFormulaToString(formula),
			expression: convertPropFormulaToExpression(formula),
			comment: `${rule}: ${derivedFrom.join(", ")}`,
			derivedFrom,
		};
	});
}

function buildAxiomStep(
	index: number,
	payload: HilbertAxiomPayload,
): PropProofStep[] {
	const { formulas, schema } = payload;
	const formula = getSchemaFunction(schema)(formulas);
	return [
		{
			index,
			step: Step.Axiom,
			formula,
			stringView: convertPropFormulaToString(formula),
			expression: convertPropFormulaToExpression(formula),
			comment: `${schema}`,
		},
	];
}

function buildBaseStep(
	index: number,
	step: Step,
	payload: HilbertBasePayload,
): PropProofStep[] {
	return [
		{
			index,
			step,
			formula: payload.formula,
			stringView: convertPropFormulaToString(payload.formula),
			expression: convertPropFormulaToExpression(payload.formula),
			comment: `${step}`,
		},
	];
}

function getSchemaFunction(schema: HilbertCalculusSchema) {
	switch (schema) {
		case HilbertCalculusSchema.II:
			return implicationIntroductionSchema;
		case HilbertCalculusSchema.ID:
			return implicationDistributionSchema;
		case HilbertCalculusSchema.IR:
			return implicationReversalSchema;
	}
}

function getRuleFunction(rule: HilbertCalculusRule) {
	switch (rule) {
		case HilbertCalculusRule.II:
			return implicationIntroductionRule;
		case HilbertCalculusRule.ID:
			return implicationDistributionRule;
		case HilbertCalculusRule.IR:
			return implicationReversalRule;
		case HilbertCalculusRule.IE:
			return implicationEliminationRule;
	}
}
