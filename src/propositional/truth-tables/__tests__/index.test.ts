import { generatePropTruthTable } from "../generate-prop-truth-table";
import { generateTruthAssignments } from "../generate-truth-assignments";
import * as utils from "../index";

describe("Truth tables index", () => {
	it("should have all expected static methods available", () => {
		expect(typeof utils.generatePropTruthTable).toBe("function");
		expect(utils.generatePropTruthTable).toBe(generatePropTruthTable);

		expect(typeof utils.generateTruthAssignments).toBe("function");
		expect(utils.generateTruthAssignments).toBe(generateTruthAssignments);
	});
});
