import { implicationIntroduction } from './implication-introduction';
import { implicationDistribution } from './implication-distribution';
import { implicationReversal } from './implication-reversal';

export const HilbertAxioms = {
  II: implicationIntroduction,
  ID: implicationDistribution,
  IR: implicationReversal,
};
