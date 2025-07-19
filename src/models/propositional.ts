import type { GlyphType, Operator, Step } from "../enums";

export type PropAtom = [string];

export interface PropSymbol {
	atom: PropAtom;
	type: GlyphType;
	position: number;
	view: string;
}

export type PropExpression = PropSymbol[];

export interface PropFormula {
	operator: Operator;
	values: PropFormula[] | PropAtom;
}

export type PropFormulaVariablesMap = Map<number, PropAtom>;

export interface PropProofStep {
	index: number;
	step: Step;
	formula: PropFormula;
	expression: PropExpression;
	stringView: string;
	comment: string;
	derivedFrom?: number[];
	level?: number;
	assumptionIndex?: number;
}

export type TruthTableRow = Record<string, boolean>;

export type TruthTable = TruthTableRow[];
