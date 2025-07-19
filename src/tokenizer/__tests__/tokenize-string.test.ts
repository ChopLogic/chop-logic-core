import { tokenizeString } from "../tokenize-string";

describe("tokenizeString", () => {
	it('should correctly tokenize "(A => B) & ~C"', () => {
		expect(tokenizeString("(A => B) & ~C")).toEqual([
			"(",
			"A",
			"=>",
			"B",
			")",
			"&",
			"~",
			"C",
		]);
	});

	it('should correctly tokenize "(A <=> B  )|| ~~C  "', () => {
		expect(tokenizeString("(A <=> B  )|| ~~C  ")).toEqual([
			"(",
			"A",
			"<=>",
			"B",
			")",
			"|",
			"|",
			"~",
			"~",
			"C",
		]);
	});

	it('should correctly tokenize "ABC <=> DFR"', () => {
		expect(tokenizeString("ABC <=> DFR")).toEqual(["ABC", "<=>", "DFR"]);
	});

	it('should correctly tokenize "p | q & ~r"', () => {
		expect(tokenizeString("p | q & ~r")).toEqual([
			"p",
			"|",
			"q",
			"&",
			"~",
			"r",
		]);
	});

	it('should correctly tokenize "p !& q !| ~@ !=> s ^ #"', () => {
		expect(tokenizeString("p !& q !| ~@ !=> s ^ #")).toEqual([
			"p",
			"!&",
			"q",
			"!|",
			"~",
			"@",
			"!=>",
			"s",
			"^",
			"#",
		]);
	});

	it("should correctly tokenize a single letter", () => {
		expect(tokenizeString("z")).toEqual(["z"]);
	});

	it("should correctly tokenize a single glyph", () => {
		expect(tokenizeString("~")).toEqual(["~"]);
	});

	it("should correctly tokenize a single glyph consisted of several characters", () => {
		expect(tokenizeString("=>")).toEqual(["=>"]);
	});

	it("should correctly tokenize complex expressions with multiple operators", () => {
		expect(tokenizeString("((A & B) => C) | D")).toEqual([
			"(",
			"(",
			"A",
			"&",
			"B",
			")",
			"=>",
			"C",
			")",
			"|",
			"D",
		]);
	});

	it("should throw an error for invalid characters (numbers, special symbols)", () => {
		expect(() => tokenizeString("1234*&2%")).toThrow(
			'Invalid character(s) found in input: "1234*&2%".',
		);
	});

	it("should throw an error for mixed valid and invalid input", () => {
		expect(() => tokenizeString("A & B + C")).toThrow(
			'Invalid character(s) found in input: "A & B + C".',
		);
	});

	it("should throw an error for numbers", () => {
		expect(() => tokenizeString("1&2")).toThrow(
			'Invalid character(s) found in input: "1&2".',
		);
	});

	it("should throw an error for non latin letters", () => {
		expect(() => tokenizeString("Ü")).toThrow(
			'Invalid character(s) found in input: "Ü".',
		);
	});

	it("should throw an error for non latin letters that look like English ones", () => {
		expect(() => tokenizeString("А & С")).toThrow(
			'Invalid character(s) found in input: "А & С".',
		);
	});

	it("should handle empty input gracefully", () => {
		expect(tokenizeString("")).toEqual([]);
	});
});
