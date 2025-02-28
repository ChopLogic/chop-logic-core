export enum Glyph {
  Implication = '=>',
  Conjunction = '&',
  Disjunction = '|',
  Negation = '~',
  Equivalence = '<=>',
  OpenParenthesis = '(',
  CloseParenthesis = ')',
}

export enum GlyphUnicode {
  Implication = '\u21D2',
  Conjunction = '\u2227',
  Disjunction = '\u2228',
  Negation = '\xAC',
  Equivalence = '\u21D4',
  OpenParenthesis = '\uFF08',
  CloseParenthesis = '\uFF09',
}

export enum GlyphType {
  Variable = 'variable',
  Operator = 'operator',
  Parenthesis = 'parenthesis',
}

export enum Operator {
  Var = 'VAR',
  Not = 'NOT',
  Or = 'OR',
  And = 'AND',
  Implies = 'IMPLIES',
  Equiv = 'EQUIV',
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
