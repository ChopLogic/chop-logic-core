import { generateTruthAssignments } from '../generate-truth-assignments';

describe('generateTruthAssignments', () => {
  test('generates truth assignments for 2 variables', () => {
    expect(generateTruthAssignments(2)).toEqual(
      new Map([
        [0, [false, false]],
        [1, [false, true]],
        [2, [true, false]],
        [3, [true, true]],
      ]),
    );
  });

  test('generates truth assignments for 3 variables', () => {
    expect(generateTruthAssignments(3)).toEqual(
      new Map([
        [0, [false, false, false]],
        [1, [false, false, true]],
        [2, [false, true, false]],
        [3, [false, true, true]],
        [4, [true, false, false]],
        [5, [true, false, true]],
        [6, [true, true, false]],
        [7, [true, true, true]],
      ]),
    );
  });

  test('throws error if variable count exceeds limit', () => {
    expect(() => generateTruthAssignments(101)).toThrow('Exceeded maximum variable limit (100) for truth assignments.');
  });

  test('generates a single truth assignment for 1 variable', () => {
    expect(generateTruthAssignments(1)).toEqual(
      new Map([
        [0, [false]],
        [1, [true]],
      ]),
    );
  });

  test('generates truth assignments for 0 variables', () => {
    expect(generateTruthAssignments(0)).toEqual(new Map([[0, []]]));
  });
});
