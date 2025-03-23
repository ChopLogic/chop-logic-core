export enum Glyph {
  Implication = '=>', // →
  ReversedImplication = '<=', // ←
  Conjunction = '&', // ∧
  Disjunction = '|', // ∨
  Negation = '~', // ¬
  Equivalence = '<=>', // ≡
  ExclusiveConjunction = '^', // ⊕ (XOR)
  ShefferStroke = '!&', // ↑ (NAND)
  WebbOperation = '!|', // ↓ (NOR)
  AntiImplication = '!=>', // ↛ (A and not B)
  ReversedAntiImplication = '!<=', // ↚ (B and not A)
  Contradiction = '#', // ⊥ (Always False)
  Tautology = '@', // ⊤ (Always True)
  OpenParenthesis = '(',
  CloseParenthesis = ')',
}

export enum GlyphUnicode {
  Implication = '\u2192', // →
  ReversedImplication = '\u2190', // ←
  Conjunction = '\u2227', // ∧
  Disjunction = '\u2228', // ∨
  Negation = '\u00AC', // ¬
  Equivalence = '\u2261', // ≡
  ExclusiveConjunction = '\u2295', // ⊕
  ShefferStroke = '\u2191', // ↑ (NAND)
  WebbOperation = '\u2193', // ↓ (NOR)
  AntiImplication = '\u219B', // ↛ (A and not B)
  ReversedAntiImplication = '\u219A', // ↚ (B and not A)
  Contradiction = '\u22A5', // ⊥
  Tautology = '\u22A4', // ⊤
  OpenParenthesis = '\uFF08', // （
  CloseParenthesis = '\uFF09', // ）
}

export enum GlyphType {
  Variable = 'variable',
  Operator = 'operator',
  Parenthesis = 'parenthesis',
}

export enum Operator {
  Var = 'VAR',
  Not = 'NOT',
  And = 'AND',
  Or = 'OR',
  Implies = 'IMPLIES',
  ReversedImplies = 'REVERSED_IMPLIES',
  Equiv = 'EQUIV',
  Xor = 'XOR',
  Nand = 'NAND',
  Nor = 'NOR',
  AntiImplies = 'ANTI_IMPLIES',
  ReversedAntiImplies = 'REVERSED_ANTI_IMPLIES',
  Contradiction = 'CONTRADICTION',
  Tautology = 'TAUTOLOGY',
}

export enum StepReason {
  Premise = 'Premise',
  Assumption = 'Assumption',
  Shortcut = 'Shortcut',
  DI = 'Disjunction Introduction',
  DE = 'Disjunction Elimination',
  II = 'Implication Introduction',
  IE = 'Implication Elimination',
  CI = 'Conjunction Introduction',
  CE = 'Conjunction Elimination',
  EI = 'Equivalence Introduction',
  EE = 'Equivalence Elimination',
  NE = 'Negation Introduction',
  NI = 'Negation Elimination',
}

export enum PropFormulaCheck {
  areEqual = 'areEqual',
  // Elimination rules
  isIE = 'isIE',
  isDE = 'isDE',
  isCE = 'isCE',
  isEE = 'isEE',
  isNE = 'isNE',
  // Creation rules
  isDC = 'isDC',
  isCC = 'isCC',
  isEC = 'isEC',
  isNC = 'isNC',
}
