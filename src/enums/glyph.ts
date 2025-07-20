export enum Glyph {
	Implication = "=>", // →
	ReversedImplication = "<=", // ←
	Conjunction = "&", // ∧
	Disjunction = "|", // ∨
	Negation = "~", // ¬
	Equivalence = "<=>", // ≡
	ExclusiveConjunction = "^", // ⊕ (XOR)
	ShefferStroke = "!&", // ↑ (NAND)
	WebbOperation = "!|", // ↓ (NOR)
	AntiImplication = "!=>", // ↛ (A and not B)
	ReversedAntiImplication = "!<=", // ↚ (B and not A)
	Contradiction = "#", // ⊥ (Always False)
	Tautology = "@", // ⊤ (Always True)
	OpenParenthesis = "(",
	CloseParenthesis = ")",
}
