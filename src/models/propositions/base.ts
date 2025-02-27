import { Operator, GlyphType } from '../../enums';

export type PropAtom = [string];

export type PropSymbol = {
  atom: PropAtom;
  type: GlyphType;
  position: number;
  view: string;
};

export type PropExpression = PropSymbol[];

export type PropFormula = {
  operator: Operator;
  values: PropFormula[] | PropAtom;
};
