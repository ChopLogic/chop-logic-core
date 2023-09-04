import { LogicalSymbolHexCode } from "../src/enums/logical-symbols";
import { PropositionalOperator } from "../src/enums/propositional-operator";
import {
  DirectProofsTableItem,
  PropositionalExpression,
  PropositionalFormula,
  PropositionalSymbol,
} from "../src/types";

const propositionalSymbols: PropositionalSymbol[] = [
  {
    input: "~",
    type: "operator",
    position: 0,
    representation: LogicalSymbolHexCode.Negation,
  },
  {
    input: "&",
    type: "operator",
    position: 1,
    representation: LogicalSymbolHexCode.Conjunction,
  },
  {
    input: "|",
    type: "operator",
    position: 2,
    representation: LogicalSymbolHexCode.Disjunction,
  },
  {
    input: "=>",
    type: "operator",
    position: 3,
    representation: LogicalSymbolHexCode.Implication,
  },
  {
    input: "<=>",
    type: "operator",
    position: 4,
    representation: LogicalSymbolHexCode.Equivalence,
  },
  {
    input: "p",
    type: "variable",
    position: 5,
    representation: "P",
  },
  {
    input: ")",
    type: "parentheses",
    position: 6,
    representation: ")",
  },
  {
    input: "(",
    type: "parentheses",
    position: 7,
    representation: "(",
  },
];

const propositionalAtom: PropositionalFormula = {
  operator: PropositionalOperator.Var,
  values: "P",
};

const propositionalExpression: PropositionalExpression = [
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 0,
  },
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 1,
  },
  {
    input: "~",
    representation: "¬",
    type: "operator",
    position: 2,
  },
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 3,
  },
  {
    input: "p",
    representation: "P",
    type: "variable",
    position: 4,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 5,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 6,
  },
  {
    input: "=>",
    representation: "⇒",
    type: "operator",
    position: 7,
  },
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 8,
  },
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 9,
  },
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 10,
  },
  {
    input: "p",
    representation: "P",
    type: "variable",
    position: 11,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 12,
  },
  {
    input: "&",
    representation: "∧",
    type: "operator",
    position: 13,
  },
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 14,
  },
  {
    input: "q",
    representation: "Q",
    type: "variable",
    position: 15,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 16,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 17,
  },
  {
    input: "=>",
    representation: "⇒",
    type: "operator",
    position: 18,
  },
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 19,
  },
  {
    input: "~",
    representation: "¬",
    type: "operator",
    position: 20,
  },
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 21,
  },
  {
    input: "p",
    representation: "P",
    type: "variable",
    position: 22,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 23,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 24,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 25,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 26,
  },
];

const friendlyPropositionalExpression: PropositionalExpression = [
  {
    input: "~",
    representation: "¬",
    type: "operator",
    position: 0,
  },
  {
    input: "P",
    representation: "P",
    type: "variable",
    position: 1,
  },
  {
    input: "=>",
    representation: "⇒",
    type: "operator",
    position: 2,
  },
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 3,
  },
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 4,
  },
  {
    input: "P",
    representation: "P",
    type: "variable",
    position: 5,
  },
  {
    input: "&",
    representation: "∧",
    type: "operator",
    position: 6,
  },
  {
    input: "Q",
    representation: "Q",
    type: "variable",
    position: 7,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 8,
  },
  {
    input: "=>",
    representation: "⇒",
    type: "operator",
    position: 9,
  },
  {
    input: "~",
    representation: "¬",
    type: "operator",
    position: 10,
  },
  {
    input: "P",
    representation: "P",
    type: "variable",
    position: 11,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 12,
  },
];

const firstSubExpression: PropositionalExpression = [
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 1,
  },
  {
    input: "~",
    representation: "¬",
    type: "operator",
    position: 2,
  },
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 3,
  },
  {
    input: "p",
    representation: "P",
    type: "variable",
    position: 4,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 5,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 6,
  },
];

const secondSubExpression: PropositionalExpression = [
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 8,
  },
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 9,
  },
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 10,
  },
  {
    input: "p",
    representation: "P",
    type: "variable",
    position: 11,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 12,
  },
  {
    input: "&",
    representation: "∧",
    type: "operator",
    position: 13,
  },
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 14,
  },
  {
    input: "q",
    representation: "Q",
    type: "variable",
    position: 15,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 16,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 17,
  },
  {
    input: "=>",
    representation: "⇒",
    type: "operator",
    position: 18,
  },
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 19,
  },
  {
    input: "~",
    representation: "¬",
    type: "operator",
    position: 20,
  },
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 21,
  },
  {
    input: "p",
    representation: "P",
    type: "variable",
    position: 22,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 23,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 24,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 25,
  },
];

const thirdSubExpression: PropositionalExpression = [
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 9,
  },
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 10,
  },
  {
    input: "p",
    representation: "P",
    type: "variable",
    position: 11,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 12,
  },
  {
    input: "&",
    representation: "∧",
    type: "operator",
    position: 13,
  },
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 14,
  },
  {
    input: "q",
    representation: "Q",
    type: "variable",
    position: 15,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 16,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 17,
  },
];

const fourthSubExpression: PropositionalExpression = [
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 19,
  },
  {
    input: "~",
    representation: "¬",
    type: "operator",
    position: 20,
  },
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 21,
  },
  {
    input: "p",
    representation: "P",
    type: "variable",
    position: 22,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 23,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 24,
  },
];

const firstVariable: PropositionalExpression = [
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 3,
  },
  {
    input: "p",
    representation: "P",
    type: "variable",
    position: 4,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 5,
  },
];

const secondVariable: PropositionalExpression = [
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 10,
  },
  {
    input: "p",
    representation: "P",
    type: "variable",
    position: 11,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 12,
  },
];

const thirdVariable: PropositionalExpression = [
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 14,
  },
  {
    input: "q",
    representation: "Q",
    type: "variable",
    position: 15,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 16,
  },
];

const fourthVariable: PropositionalExpression = [
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 21,
  },
  {
    input: "p",
    representation: "P",
    type: "variable",
    position: 22,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 23,
  },
];

const openParenthesis: PropositionalSymbol = {
  input: "(",
  representation: "(",
  type: "parentheses",
  position: 0,
};

const closeParenthesis: PropositionalSymbol = {
  input: ")",
  representation: ")",
  type: "parentheses",
  position: 2,
};

const propositionalFormula: PropositionalFormula = {
  operator: PropositionalOperator.Implies,
  values: [
    {
      operator: PropositionalOperator.Not,
      values: [
        {
          operator: PropositionalOperator.Var,
          values: "P",
        },
      ],
    },
    {
      operator: PropositionalOperator.Implies,
      values: [
        {
          operator: PropositionalOperator.And,
          values: [
            {
              operator: PropositionalOperator.Var,
              values: "P",
            },
            {
              operator: PropositionalOperator.Var,
              values: "Q",
            },
          ],
        },
        {
          operator: PropositionalOperator.Not,
          values: [
            {
              operator: PropositionalOperator.Var,
              values: "P",
            },
          ],
        },
      ],
    },
  ],
};

const firstSubFormula: PropositionalFormula = {
  operator: PropositionalOperator.Not,
  values: [
    {
      operator: PropositionalOperator.Var,
      values: "P",
    },
  ],
};

const secondSubFormula: PropositionalFormula = {
  operator: PropositionalOperator.Implies,
  values: [
    {
      operator: PropositionalOperator.And,
      values: [
        {
          operator: PropositionalOperator.Var,
          values: "P",
        },
        {
          operator: PropositionalOperator.Var,
          values: "Q",
        },
      ],
    },
    {
      operator: PropositionalOperator.Not,
      values: [
        {
          operator: PropositionalOperator.Var,
          values: "P",
        },
      ],
    },
  ],
};

const oneVariableExpression: PropositionalExpression = [
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 0,
  },
  {
    input: "p",
    representation: "P",
    type: "variable",
    position: 1,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 2,
  },
];

const twoVariablesExpression: PropositionalExpression = [
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 0,
  },
  {
    input: "p",
    representation: "P",
    type: "variable",
    position: 1,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 2,
  },
  {
    input: "&",
    representation: "∧",
    type: "operator",
    position: 3,
  },
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 4,
  },
  {
    input: "p",
    representation: "P",
    type: "variable",
    position: 5,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 6,
  },
];

const oneNegationExpression: PropositionalExpression = [
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 0,
  },
  {
    input: "~",
    representation: "¬",
    type: "operator",
    position: 1,
  },
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 2,
  },
  {
    input: "p",
    representation: "P",
    type: "variable",
    position: 3,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 4,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 5,
  },
];

const threeNegationsExpression: PropositionalExpression = [
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 0,
  },
  {
    input: "~",
    representation: "¬",
    type: "operator",
    position: 1,
  },
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 2,
  },
  {
    input: "~",
    representation: "¬",
    type: "operator",
    position: 3,
  },
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 4,
  },
  {
    input: "~",
    representation: "¬",
    type: "operator",
    position: 5,
  },
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 6,
  },
  {
    input: "p",
    representation: "P",
    type: "variable",
    position: 7,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 8,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 9,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 10,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 11,
  },
];

const secondFriendlyExpression: PropositionalExpression = [
  {
    input: "~",
    representation: "¬",
    type: "operator",
    position: 0,
  },
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 1,
  },
  {
    input: "~",
    representation: "¬",
    type: "operator",
    position: 2,
  },
  {
    input: "P",
    representation: "P",
    type: "variable",
    position: 3,
  },
  {
    input: "=>",
    representation: "⇒",
    type: "operator",
    position: 4,
  },
  {
    input: "Q",
    representation: "Q",
    type: "variable",
    position: 5,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 6,
  },
];

const implicationDistributionExpression: PropositionalExpression = [
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 0,
  },
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 1,
  },
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 2,
  },
  {
    input: "P",
    representation: "P",
    type: "variable",
    position: 3,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 4,
  },
  {
    input: "=>",
    representation: "⇒",
    type: "operator",
    position: 5,
  },
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 6,
  },
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 7,
  },
  {
    input: "~",
    representation: "¬",
    type: "operator",
    position: 8,
  },
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 9,
  },
  {
    input: "Q",
    representation: "Q",
    type: "variable",
    position: 10,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 11,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 12,
  },
  {
    input: "=>",
    representation: "⇒",
    type: "operator",
    position: 13,
  },
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 14,
  },
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 15,
  },
  {
    input: "R",
    representation: "R",
    type: "variable",
    position: 16,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 17,
  },
  {
    input: "|",
    representation: "∨",
    type: "operator",
    position: 18,
  },
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 19,
  },
  {
    input: "S",
    representation: "S",
    type: "variable",
    position: 20,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 21,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 22,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 23,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 24,
  },
  {
    input: "=>",
    representation: "⇒",
    type: "operator",
    position: 25,
  },
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 26,
  },
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 27,
  },
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 28,
  },
  {
    input: "P",
    representation: "P",
    type: "variable",
    position: 29,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 30,
  },
  {
    input: "=>",
    representation: "⇒",
    type: "operator",
    position: 31,
  },
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 32,
  },
  {
    input: "~",
    representation: "¬",
    type: "operator",
    position: 33,
  },
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 34,
  },
  {
    input: "Q",
    representation: "Q",
    type: "variable",
    position: 35,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 36,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 37,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 38,
  },
  {
    input: "=>",
    representation: "⇒",
    type: "operator",
    position: 39,
  },
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 40,
  },
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 41,
  },
  {
    input: "P",
    representation: "P",
    type: "variable",
    position: 42,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 43,
  },
  {
    input: "=>",
    representation: "⇒",
    type: "operator",
    position: 44,
  },
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 45,
  },
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 46,
  },
  {
    input: "R",
    representation: "R",
    type: "variable",
    position: 47,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 48,
  },
  {
    input: "|",
    representation: "∨",
    type: "operator",
    position: 49,
  },
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 50,
  },
  {
    input: "S",
    representation: "S",
    type: "variable",
    position: 51,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 52,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 53,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 54,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 55,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 56,
  },
];

const friendlyImplicationDistributionExpression: PropositionalExpression = [
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 0,
  },
  {
    input: "P",
    representation: "P",
    type: "variable",
    position: 1,
  },
  {
    input: "=>",
    representation: "⇒",
    type: "operator",
    position: 2,
  },
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 3,
  },
  {
    input: "~",
    representation: "¬",
    type: "operator",
    position: 4,
  },
  {
    input: "Q",
    representation: "Q",
    type: "variable",
    position: 5,
  },
  {
    input: "=>",
    representation: "⇒",
    type: "operator",
    position: 6,
  },
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 7,
  },
  {
    input: "R",
    representation: "R",
    type: "variable",
    position: 8,
  },
  {
    input: "|",
    representation: "∨",
    type: "operator",
    position: 9,
  },
  {
    input: "S",
    representation: "S",
    type: "variable",
    position: 10,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 11,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 12,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 13,
  },
  {
    input: "=>",
    representation: "⇒",
    type: "operator",
    position: 14,
  },
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 15,
  },
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 16,
  },
  {
    input: "P",
    representation: "P",
    type: "variable",
    position: 17,
  },
  {
    input: "=>",
    representation: "⇒",
    type: "operator",
    position: 18,
  },
  {
    input: "~",
    representation: "¬",
    type: "operator",
    position: 19,
  },
  {
    input: "Q",
    representation: "Q",
    type: "variable",
    position: 20,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 21,
  },
  {
    input: "=>",
    representation: "⇒",
    type: "operator",
    position: 22,
  },
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 23,
  },
  {
    input: "P",
    representation: "P",
    type: "variable",
    position: 24,
  },
  {
    input: "=>",
    representation: "⇒",
    type: "operator",
    position: 25,
  },
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 26,
  },
  {
    input: "R",
    representation: "R",
    type: "variable",
    position: 27,
  },
  {
    input: "|",
    representation: "∨",
    type: "operator",
    position: 28,
  },
  {
    input: "S",
    representation: "S",
    type: "variable",
    position: 29,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 30,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 31,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 32,
  },
];

const contradictionRealizationExpression: PropositionalExpression = [
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 0,
  },
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 1,
  },
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 2,
  },
  {
    input: "~",
    representation: "¬",
    type: "operator",
    position: 3,
  },
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 4,
  },
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 5,
  },
  {
    input: "P",
    representation: "P",
    type: "variable",
    position: 6,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 7,
  },
  {
    input: "=>",
    representation: "⇒",
    type: "operator",
    position: 8,
  },
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 9,
  },
  {
    input: "Q",
    representation: "Q",
    type: "variable",
    position: 10,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 11,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 12,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 13,
  },
  {
    input: "=>",
    representation: "⇒",
    type: "operator",
    position: 14,
  },
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 15,
  },
  {
    input: "~",
    representation: "¬",
    type: "operator",
    position: 16,
  },
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 17,
  },
  {
    input: "R",
    representation: "R",
    type: "variable",
    position: 18,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 19,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 20,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 21,
  },
  {
    input: "=>",
    representation: "⇒",
    type: "operator",
    position: 22,
  },
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 23,
  },
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 24,
  },
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 25,
  },
  {
    input: "~",
    representation: "¬",
    type: "operator",
    position: 26,
  },
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 27,
  },
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 28,
  },
  {
    input: "P",
    representation: "P",
    type: "variable",
    position: 29,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 30,
  },
  {
    input: "=>",
    representation: "⇒",
    type: "operator",
    position: 31,
  },
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 32,
  },
  {
    input: "Q",
    representation: "Q",
    type: "variable",
    position: 33,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 34,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 35,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 36,
  },
  {
    input: "=>",
    representation: "⇒",
    type: "operator",
    position: 37,
  },
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 38,
  },
  {
    input: "~",
    representation: "¬",
    type: "operator",
    position: 39,
  },
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 40,
  },
  {
    input: "~",
    representation: "¬",
    type: "operator",
    position: 41,
  },
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 42,
  },
  {
    input: "R",
    representation: "R",
    type: "variable",
    position: 43,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 44,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 45,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 46,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 47,
  },
  {
    input: "=>",
    representation: "⇒",
    type: "operator",
    position: 48,
  },
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 49,
  },
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 50,
  },
  {
    input: "P",
    representation: "P",
    type: "variable",
    position: 51,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 52,
  },
  {
    input: "=>",
    representation: "⇒",
    type: "operator",
    position: 53,
  },
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 54,
  },
  {
    input: "Q",
    representation: "Q",
    type: "variable",
    position: 55,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 56,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 57,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 58,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 59,
  },
];

const contradictionRealizationFriendlyExpression: PropositionalExpression = [
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 0,
  },
  {
    input: "~",
    representation: "¬",
    type: "operator",
    position: 1,
  },
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 2,
  },
  {
    input: "P",
    representation: "P",
    type: "variable",
    position: 3,
  },
  {
    input: "=>",
    representation: "⇒",
    type: "operator",
    position: 4,
  },
  {
    input: "Q",
    representation: "Q",
    type: "variable",
    position: 5,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 6,
  },
  {
    input: "=>",
    representation: "⇒",
    type: "operator",
    position: 7,
  },
  {
    input: "~",
    representation: "¬",
    type: "operator",
    position: 8,
  },
  {
    input: "R",
    representation: "R",
    type: "variable",
    position: 9,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 10,
  },
  {
    input: "=>",
    representation: "⇒",
    type: "operator",
    position: 11,
  },
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 12,
  },
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 13,
  },
  {
    input: "~",
    representation: "¬",
    type: "operator",
    position: 14,
  },
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 15,
  },
  {
    input: "P",
    representation: "P",
    type: "variable",
    position: 16,
  },
  {
    input: "=>",
    representation: "⇒",
    type: "operator",
    position: 17,
  },
  {
    input: "Q",
    representation: "Q",
    type: "variable",
    position: 18,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 19,
  },
  {
    input: "=>",
    representation: "⇒",
    type: "operator",
    position: 20,
  },
  {
    input: "~",
    representation: "¬",
    type: "operator",
    position: 21,
  },
  {
    input: "~",
    representation: "¬",
    type: "operator",
    position: 22,
  },
  {
    input: "R",
    representation: "R",
    type: "variable",
    position: 23,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 24,
  },
  {
    input: "=>",
    representation: "⇒",
    type: "operator",
    position: 25,
  },
  {
    input: "(",
    representation: "(",
    type: "parentheses",
    position: 26,
  },
  {
    input: "P",
    representation: "P",
    type: "variable",
    position: 27,
  },
  {
    input: "=>",
    representation: "⇒",
    type: "operator",
    position: 28,
  },
  {
    input: "Q",
    representation: "Q",
    type: "variable",
    position: 29,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 30,
  },
  {
    input: ")",
    representation: ")",
    type: "parentheses",
    position: 31,
  },
];

const implicationDistributionFormula: PropositionalFormula = {
  operator: PropositionalOperator.Implies,
  values: [
    {
      operator: PropositionalOperator.Implies,
      values: [
        {
          operator: PropositionalOperator.Var,
          values: "P",
        },
        {
          operator: PropositionalOperator.Implies,
          values: [
            {
              operator: PropositionalOperator.Not,
              values: [
                {
                  operator: PropositionalOperator.Var,
                  values: "Q",
                },
              ],
            },
            {
              operator: PropositionalOperator.Or,
              values: [
                {
                  operator: PropositionalOperator.Var,
                  values: "R",
                },
                {
                  operator: PropositionalOperator.Var,
                  values: "S",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      operator: PropositionalOperator.Implies,
      values: [
        {
          operator: PropositionalOperator.Implies,
          values: [
            {
              operator: PropositionalOperator.Var,
              values: "P",
            },
            {
              operator: PropositionalOperator.Not,
              values: [
                {
                  operator: PropositionalOperator.Var,
                  values: "Q",
                },
              ],
            },
          ],
        },
        {
          operator: PropositionalOperator.Implies,
          values: [
            {
              operator: PropositionalOperator.Var,
              values: "P",
            },
            {
              operator: PropositionalOperator.Or,
              values: [
                {
                  operator: PropositionalOperator.Var,
                  values: "R",
                },
                {
                  operator: PropositionalOperator.Var,
                  values: "S",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

const contradictionRealizationFormula: PropositionalFormula = {
  operator: PropositionalOperator.Implies,
  values: [
    {
      operator: PropositionalOperator.Implies,
      values: [
        {
          operator: PropositionalOperator.Not,
          values: [
            {
              operator: PropositionalOperator.Implies,
              values: [
                {
                  operator: PropositionalOperator.Var,
                  values: "P",
                },
                {
                  operator: PropositionalOperator.Var,
                  values: "Q",
                },
              ],
            },
          ],
        },
        {
          operator: PropositionalOperator.Not,
          values: [
            {
              operator: PropositionalOperator.Var,
              values: "R",
            },
          ],
        },
      ],
    },
    {
      operator: PropositionalOperator.Implies,
      values: [
        {
          operator: PropositionalOperator.Implies,
          values: [
            {
              operator: PropositionalOperator.Not,
              values: [
                {
                  operator: PropositionalOperator.Implies,
                  values: [
                    {
                      operator: PropositionalOperator.Var,
                      values: "P",
                    },
                    {
                      operator: PropositionalOperator.Var,
                      values: "Q",
                    },
                  ],
                },
              ],
            },
            {
              operator: PropositionalOperator.Not,
              values: [
                {
                  operator: PropositionalOperator.Not,
                  values: [
                    {
                      operator: PropositionalOperator.Var,
                      values: "R",
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          operator: PropositionalOperator.Implies,
          values: [
            {
              operator: PropositionalOperator.Var,
              values: "P",
            },
            {
              operator: PropositionalOperator.Var,
              values: "Q",
            },
          ],
        },
      ],
    },
  ],
};

const implicationEliminationFormula: PropositionalFormula = {
  operator: PropositionalOperator.Implies,
  values: [
    {
      operator: PropositionalOperator.Or,
      values: [
        {
          operator: PropositionalOperator.Var,
          values: "P",
        },
        {
          operator: PropositionalOperator.Not,
          values: [
            {
              operator: PropositionalOperator.Var,
              values: "Q",
            },
          ],
        },
      ],
    },
    {
      operator: PropositionalOperator.Implies,
      values: [
        {
          operator: PropositionalOperator.Implies,
          values: [
            {
              operator: PropositionalOperator.Var,
              values: "P",
            },
            {
              operator: PropositionalOperator.Var,
              values: "Q",
            },
          ],
        },
        {
          operator: PropositionalOperator.Or,
          values: [
            {
              operator: PropositionalOperator.Var,
              values: "P",
            },
            {
              operator: PropositionalOperator.Not,
              values: [
                {
                  operator: PropositionalOperator.Var,
                  values: "Q",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

const implicationEliminationConsequent: PropositionalFormula = {
  operator: PropositionalOperator.Implies,
  values: [
    {
      operator: PropositionalOperator.Implies,
      values: [
        {
          operator: PropositionalOperator.Var,
          values: "P",
        },
        {
          operator: PropositionalOperator.Var,
          values: "Q",
        },
      ],
    },
    {
      operator: PropositionalOperator.Or,
      values: [
        {
          operator: PropositionalOperator.Var,
          values: "P",
        },
        {
          operator: PropositionalOperator.Not,
          values: [
            {
              operator: PropositionalOperator.Var,
              values: "Q",
            },
          ],
        },
      ],
    },
  ],
};

const implicationEliminationAntecedent: PropositionalFormula = {
  operator: PropositionalOperator.Or,
  values: [
    {
      operator: PropositionalOperator.Var,
      values: "P",
    },
    {
      operator: PropositionalOperator.Not,
      values: [
        {
          operator: PropositionalOperator.Var,
          values: "Q",
        },
      ],
    },
  ],
};

const testTableItemWithReplacedVariable: DirectProofsTableItem[] = [
  {
    step: 1,
    id: "proof-step-1",
    rawInput: "Z, Q",
    dependentOn: null,
    expression: [
      {
        input: "(",
        representation: "(",
        type: "parentheses",
        position: 0,
      },
      {
        input: "(",
        representation: "(",
        type: "parentheses",
        position: 1,
      },
      {
        input: "(",
        representation: "(",
        type: "parentheses",
        position: 2,
      },
      {
        input: "~",
        representation: "¬",
        type: "operator",
        position: 3,
      },
      {
        input: "(",
        representation: "(",
        type: "parentheses",
        position: 4,
      },
      {
        input: "Z",
        representation: "Z",
        type: "variable",
        position: 5,
      },
      {
        input: ")",
        representation: ")",
        type: "parentheses",
        position: 6,
      },
      {
        input: ")",
        representation: ")",
        type: "parentheses",
        position: 7,
      },
      {
        input: "=>",
        representation: "⇒",
        type: "operator",
        position: 8,
      },
      {
        input: "(",
        representation: "(",
        type: "parentheses",
        position: 9,
      },
      {
        input: "Q",
        representation: "Q",
        type: "variable",
        position: 10,
      },
      {
        input: ")",
        representation: ")",
        type: "parentheses",
        position: 11,
      },
      {
        input: ")",
        representation: ")",
        type: "parentheses",
        position: 12,
      },
      {
        input: "=>",
        representation: "⇒",
        type: "operator",
        position: 13,
      },
      {
        input: "(",
        representation: "(",
        type: "parentheses",
        position: 14,
      },
      {
        input: "(",
        representation: "(",
        type: "parentheses",
        position: 15,
      },
      {
        input: "(",
        representation: "(",
        type: "parentheses",
        position: 16,
      },
      {
        input: "~",
        representation: "¬",
        type: "operator",
        position: 17,
      },
      {
        input: "(",
        representation: "(",
        type: "parentheses",
        position: 18,
      },
      {
        input: "Z",
        representation: "Z",
        type: "variable",
        position: 19,
      },
      {
        input: ")",
        representation: ")",
        type: "parentheses",
        position: 20,
      },
      {
        input: ")",
        representation: ")",
        type: "parentheses",
        position: 21,
      },
      {
        input: "=>",
        representation: "⇒",
        type: "operator",
        position: 22,
      },
      {
        input: "(",
        representation: "(",
        type: "parentheses",
        position: 23,
      },
      {
        input: "~",
        representation: "¬",
        type: "operator",
        position: 24,
      },
      {
        input: "(",
        representation: "(",
        type: "parentheses",
        position: 25,
      },
      {
        input: "Q",
        representation: "Q",
        type: "variable",
        position: 26,
      },
      {
        input: ")",
        representation: ")",
        type: "parentheses",
        position: 27,
      },
      {
        input: ")",
        representation: ")",
        type: "parentheses",
        position: 28,
      },
      {
        input: ")",
        representation: ")",
        type: "parentheses",
        position: 29,
      },
      {
        input: "=>",
        representation: "⇒",
        type: "operator",
        position: 30,
      },
      {
        input: "(",
        representation: "(",
        type: "parentheses",
        position: 31,
      },
      {
        input: "Z",
        representation: "Z",
        type: "variable",
        position: 32,
      },
      {
        input: ")",
        representation: ")",
        type: "parentheses",
        position: 33,
      },
      {
        input: ")",
        representation: ")",
        type: "parentheses",
        position: 34,
      },
      {
        input: ")",
        representation: ")",
        type: "parentheses",
        position: 35,
      },
    ],
    friendlyExpression: [
      {
        input: "(",
        representation: "(",
        type: "parentheses",
        position: 0,
      },
      {
        input: "~",
        representation: "¬",
        type: "operator",
        position: 1,
      },
      {
        input: "Z",
        representation: "Z",
        type: "variable",
        position: 2,
      },
      {
        input: "=>",
        representation: "⇒",
        type: "operator",
        position: 3,
      },
      {
        input: "Q",
        representation: "Q",
        type: "variable",
        position: 4,
      },
      {
        input: ")",
        representation: ")",
        type: "parentheses",
        position: 5,
      },
      {
        input: "=>",
        representation: "⇒",
        type: "operator",
        position: 6,
      },
      {
        input: "(",
        representation: "(",
        type: "parentheses",
        position: 7,
      },
      {
        input: "(",
        representation: "(",
        type: "parentheses",
        position: 8,
      },
      {
        input: "~",
        representation: "¬",
        type: "operator",
        position: 9,
      },
      {
        input: "Z",
        representation: "Z",
        type: "variable",
        position: 10,
      },
      {
        input: "=>",
        representation: "⇒",
        type: "operator",
        position: 11,
      },
      {
        input: "~",
        representation: "¬",
        type: "operator",
        position: 12,
      },
      {
        input: "Q",
        representation: "Q",
        type: "variable",
        position: 13,
      },
      {
        input: ")",
        representation: ")",
        type: "parentheses",
        position: 14,
      },
      {
        input: "=>",
        representation: "⇒",
        type: "operator",
        position: 15,
      },
      {
        input: "Z",
        representation: "Z",
        type: "variable",
        position: 16,
      },
      {
        input: ")",
        representation: ")",
        type: "parentheses",
        position: 17,
      },
    ],
    formula: {
      operator: PropositionalOperator.Implies,
      values: [
        {
          operator: PropositionalOperator.Implies,
          values: [
            {
              operator: PropositionalOperator.Not,
              values: [
                {
                  operator: PropositionalOperator.Var,
                  values: "Z",
                },
              ],
            },
            {
              operator: PropositionalOperator.Var,
              values: "Q",
            },
          ],
        },
        {
          operator: PropositionalOperator.Implies,
          values: [
            {
              operator: PropositionalOperator.Implies,
              values: [
                {
                  operator: PropositionalOperator.Not,
                  values: [
                    {
                      operator: PropositionalOperator.Var,
                      values: "Z",
                    },
                  ],
                },
                {
                  operator: PropositionalOperator.Not,
                  values: [
                    {
                      operator: PropositionalOperator.Var,
                      values: "Q",
                    },
                  ],
                },
              ],
            },
            {
              operator: PropositionalOperator.Var,
              values: "Z",
            },
          ],
        },
      ],
    },
    comment: "CR",
  },
];

const testTableItem: DirectProofsTableItem[] = [
  {
    step: 1,
    id: "proof-step-1",
    rawInput: "P, Q",
    dependentOn: null,
    expression: [
      {
        input: "(",
        representation: "(",
        type: "parentheses",
        position: 0,
      },
      {
        input: "(",
        representation: "(",
        type: "parentheses",
        position: 1,
      },
      {
        input: "(",
        representation: "(",
        type: "parentheses",
        position: 2,
      },
      {
        input: "~",
        representation: "¬",
        type: "operator",
        position: 3,
      },
      {
        input: "(",
        representation: "(",
        type: "parentheses",
        position: 4,
      },
      {
        input: "P",
        representation: "P",
        type: "variable",
        position: 5,
      },
      {
        input: ")",
        representation: ")",
        type: "parentheses",
        position: 6,
      },
      {
        input: ")",
        representation: ")",
        type: "parentheses",
        position: 7,
      },
      {
        input: "=>",
        representation: "⇒",
        type: "operator",
        position: 8,
      },
      {
        input: "(",
        representation: "(",
        type: "parentheses",
        position: 9,
      },
      {
        input: "Q",
        representation: "Q",
        type: "variable",
        position: 10,
      },
      {
        input: ")",
        representation: ")",
        type: "parentheses",
        position: 11,
      },
      {
        input: ")",
        representation: ")",
        type: "parentheses",
        position: 12,
      },
      {
        input: "=>",
        representation: "⇒",
        type: "operator",
        position: 13,
      },
      {
        input: "(",
        representation: "(",
        type: "parentheses",
        position: 14,
      },
      {
        input: "(",
        representation: "(",
        type: "parentheses",
        position: 15,
      },
      {
        input: "(",
        representation: "(",
        type: "parentheses",
        position: 16,
      },
      {
        input: "~",
        representation: "¬",
        type: "operator",
        position: 17,
      },
      {
        input: "(",
        representation: "(",
        type: "parentheses",
        position: 18,
      },
      {
        input: "P",
        representation: "P",
        type: "variable",
        position: 19,
      },
      {
        input: ")",
        representation: ")",
        type: "parentheses",
        position: 20,
      },
      {
        input: ")",
        representation: ")",
        type: "parentheses",
        position: 21,
      },
      {
        input: "=>",
        representation: "⇒",
        type: "operator",
        position: 22,
      },
      {
        input: "(",
        representation: "(",
        type: "parentheses",
        position: 23,
      },
      {
        input: "~",
        representation: "¬",
        type: "operator",
        position: 24,
      },
      {
        input: "(",
        representation: "(",
        type: "parentheses",
        position: 25,
      },
      {
        input: "Q",
        representation: "Q",
        type: "variable",
        position: 26,
      },
      {
        input: ")",
        representation: ")",
        type: "parentheses",
        position: 27,
      },
      {
        input: ")",
        representation: ")",
        type: "parentheses",
        position: 28,
      },
      {
        input: ")",
        representation: ")",
        type: "parentheses",
        position: 29,
      },
      {
        input: "=>",
        representation: "⇒",
        type: "operator",
        position: 30,
      },
      {
        input: "(",
        representation: "(",
        type: "parentheses",
        position: 31,
      },
      {
        input: "P",
        representation: "P",
        type: "variable",
        position: 32,
      },
      {
        input: ")",
        representation: ")",
        type: "parentheses",
        position: 33,
      },
      {
        input: ")",
        representation: ")",
        type: "parentheses",
        position: 34,
      },
      {
        input: ")",
        representation: ")",
        type: "parentheses",
        position: 35,
      },
    ],
    friendlyExpression: [
      {
        input: "(",
        representation: "(",
        type: "parentheses",
        position: 0,
      },
      {
        input: "~",
        representation: "¬",
        type: "operator",
        position: 1,
      },
      {
        input: "P",
        representation: "P",
        type: "variable",
        position: 2,
      },
      {
        input: "=>",
        representation: "⇒",
        type: "operator",
        position: 3,
      },
      {
        input: "Q",
        representation: "Q",
        type: "variable",
        position: 4,
      },
      {
        input: ")",
        representation: ")",
        type: "parentheses",
        position: 5,
      },
      {
        input: "=>",
        representation: "⇒",
        type: "operator",
        position: 6,
      },
      {
        input: "(",
        representation: "(",
        type: "parentheses",
        position: 7,
      },
      {
        input: "(",
        representation: "(",
        type: "parentheses",
        position: 8,
      },
      {
        input: "~",
        representation: "¬",
        type: "operator",
        position: 9,
      },
      {
        input: "P",
        representation: "P",
        type: "variable",
        position: 10,
      },
      {
        input: "=>",
        representation: "⇒",
        type: "operator",
        position: 11,
      },
      {
        input: "~",
        representation: "¬",
        type: "operator",
        position: 12,
      },
      {
        input: "Q",
        representation: "Q",
        type: "variable",
        position: 13,
      },
      {
        input: ")",
        representation: ")",
        type: "parentheses",
        position: 14,
      },
      {
        input: "=>",
        representation: "⇒",
        type: "operator",
        position: 15,
      },
      {
        input: "P",
        representation: "P",
        type: "variable",
        position: 16,
      },
      {
        input: ")",
        representation: ")",
        type: "parentheses",
        position: 17,
      },
    ],
    formula: {
      operator: PropositionalOperator.Implies,
      values: [
        {
          operator: PropositionalOperator.Implies,
          values: [
            {
              operator: PropositionalOperator.Not,
              values: [
                {
                  operator: PropositionalOperator.Var,
                  values: "P",
                },
              ],
            },
            {
              operator: PropositionalOperator.Var,
              values: "Q",
            },
          ],
        },
        {
          operator: PropositionalOperator.Implies,
          values: [
            {
              operator: PropositionalOperator.Implies,
              values: [
                {
                  operator: PropositionalOperator.Not,
                  values: [
                    {
                      operator: PropositionalOperator.Var,
                      values: "P",
                    },
                  ],
                },
                {
                  operator: PropositionalOperator.Not,
                  values: [
                    {
                      operator: PropositionalOperator.Var,
                      values: "Q",
                    },
                  ],
                },
              ],
            },
            {
              operator: PropositionalOperator.Var,
              values: "P",
            },
          ],
        },
      ],
    },
    comment: "CR",
  },
];

const propositionsFormulasItems = {
  secondSubFormula,
  firstSubFormula,
  propositionalFormula,
  openParenthesis,
  closeParenthesis,
  fourthVariable,
  thirdVariable,
  secondVariable,
  firstVariable,
  fourthSubExpression,
  thirdSubExpression,
  secondSubExpression,
  firstSubExpression,
  propositionalExpression,
  friendlyPropositionalExpression,
  secondFriendlyExpression,
  propositionalAtom,
  propositionalSymbols,
  oneVariableExpression,
  twoVariablesExpression,
  oneNegationExpression,
  threeNegationsExpression,
  implicationDistributionExpression,
  friendlyImplicationDistributionExpression,
  implicationDistributionFormula,
  contradictionRealizationExpression,
  contradictionRealizationFriendlyExpression,
  contradictionRealizationFormula,
  implicationEliminationFormula,
  implicationEliminationConsequent,
  implicationEliminationAntecedent,
  testTableItem,
  testTableItemWithReplacedVariable,
};

export default Object.freeze(propositionsFormulasItems);
