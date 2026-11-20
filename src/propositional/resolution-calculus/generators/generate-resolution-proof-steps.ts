import { Operator, ResolutionCalculusRule, Step } from "../../../enums";
import type {
	PropClause,
	PropLiteral,
	ResolutionBasePayload,
	ResolutionDerivedPayload,
	ResolutionProofStep,
	ResolutionProofStepInput,
} from "../../../models";
import { convertPropClauseToString } from "../../converters/convert-prop-clause-to-string";
import { arePropLiteralsComplementary } from "../../validators/are-prop-literals-complementary";
import { resolutionRule } from "../rules/resolution";

const BASE_STEP_COMMENTS: Partial<Record<Step, string>> = {
	[Step.NegatedGoal]: "Negated goal",
};

/**
 * Generates ResolutionProofStep objects for use in resolution proofs.
 * Supports Derivation, Premise, NegatedGoal, Reiteration and Shortcut step types.
 * A derivation produces one step per resolvent (see {@link resolutionRule}).
 *
 * @param input - An object with necessary data for the new proof step(s).
 * @returns New proof steps based on the input.
 * @throws {Error} if the derivation rule is not applicable to the given clauses.
 * @category Resolution Calculus
 */
export function generateResolutionProofSteps<T>(
	input: ResolutionProofStepInput<T>,
): ResolutionProofStep[] {
	const { index, step } = input;

	if (step === Step.Derivation) {
		return buildDerivedSteps(index, input.payload as ResolutionDerivedPayload);
	}

	return buildBaseStep(index, step, input.payload as ResolutionBasePayload);
}

function buildDerivedSteps(
	index: number,
	payload: ResolutionDerivedPayload,
): ResolutionProofStep[] {
	const { clauses, rule, derivedFrom } = payload;
	const resolvents = getRuleFunction(rule)(clauses);
	const resolvedLiterals = getResolvedLiterals(clauses);

	return resolvents.map((clause, derivedIndex) => ({
		index: index + derivedIndex,
		step: Step.Derivation,
		clause,
		stringView: convertPropClauseToString(clause),
		comment: `${rule}: ${derivedFrom.join(", ")}`,
		derivedFrom,
		resolvedLiteral: resolvedLiterals[derivedIndex],
	}));
}

function buildBaseStep(
	index: number,
	step: Step,
	payload: ResolutionBasePayload,
): ResolutionProofStep[] {
	return [
		{
			index,
			step,
			clause: payload.clause,
			stringView: convertPropClauseToString(payload.clause),
			comment: BASE_STEP_COMMENTS[step] ?? `${step}`,
		},
	];
}

/**
 * Returns the positive literal of every complementary pair, in the same order as the resolvents.
 */
function getResolvedLiterals([first, second]: PropClause[]): PropLiteral[] {
	return first.flatMap((literal) =>
		second
			.filter((other) => arePropLiteralsComplementary([literal, other]))
			.map((other) => (literal.operator === Operator.Not ? other : literal)),
	);
}

type RuleFunction = (clauses: PropClause[]) => PropClause[];

function getRuleFunction(rule: ResolutionCalculusRule): RuleFunction {
	switch (rule) {
		case ResolutionCalculusRule.R:
			return resolutionRule;
	}
}
