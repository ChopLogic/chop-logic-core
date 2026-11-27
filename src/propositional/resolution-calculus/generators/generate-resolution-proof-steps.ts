import { Operator, Step } from "../../../enums";
import type {
	PropClause,
	PropLiteral,
	ResolutionBasePayload,
	ResolutionDerivedPayload,
	ResolutionProofStep,
	ResolutionProofStepInput,
} from "../../../models";
import { convertPropClauseToString } from "../../converters/convert-prop-clause-to-string";
import { normalizePropClause } from "../../converters/normalize-prop-clause";
import { arePropLiteralsComplementary } from "../../validators/are-prop-literals-complementary";
import { ResolutionRules } from "../rules";

const BASE_STEP_COMMENTS: Partial<Record<Step, string>> = {
	[Step.NegatedGoal]: "Negated goal",
};

/**
 * Generates ResolutionProofStep objects for use in resolution proofs.
 * Supports Derivation, Premise, NegatedGoal, Reiteration and Shortcut step types.
 * A derivation produces one step per resolvent (see {@link ResolutionRules}).
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
	const resolvents = ResolutionRules[rule](clauses);
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
 * The clauses are normalized the same way as in the resolution rule, so each pair occurs once.
 */
function getResolvedLiterals(clauses: PropClause[]): PropLiteral[] {
	const [first, second] = clauses.map(normalizePropClause);

	return first.flatMap((literal) =>
		second
			.filter((other) => arePropLiteralsComplementary([literal, other]))
			.map((other) => (literal.operator === Operator.Not ? other : literal)),
	);
}
