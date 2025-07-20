import type { TruthAssignmentsMap } from "../../models";

/**
 * Generates all possible truth assignments for a given number of variables.
 *
 * @param varCount - The number of boolean variables.
 * @param limit - The maximum allowed number of variables (default: 100).
 * @returns A map of truth assignments, indexed by binary count.
 * @throws {Error} If varCount exceeds the limit.
 */
export function generateTruthAssignments(
	varCount: number,
	limit: number = 100,
): TruthAssignmentsMap {
	if (varCount > limit) {
		throw new Error(
			`Exceeded maximum variable limit (${limit}) for truth assignments.`,
		);
	}

	const numAssignments = 2 ** varCount;
	const assignments: TruthAssignmentsMap = new Map();

	for (let i = 0; i < numAssignments; i++) {
		const binaryValues = Array.from({ length: varCount }, (_, bit) =>
			Boolean(i & (1 << (varCount - bit - 1))),
		);
		assignments.set(i, binaryValues);
	}

	return assignments;
}
