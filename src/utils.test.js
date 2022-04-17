import { render, screen } from '@testing-library/react';
import utils from './utils';

const HARD_PUZZLE = {
  difficulty: 'hard',
  puzzle: {F7:'4', F9:'9', H1:'1', H4:'7', B3:'5', B7:'1', H7:'3', C8:'9', E8:'8', E1:'7', G2:'9', G4:'2', E7:'2', B2:'4', D5:'5', C9:'3', A6:'5', E6:'4', G8:'1', I3:'8', I8:'6', H5:'9', I6:'3', A9:'8', A5:'3', F4: '3'}
};

const b = null;

const emptyBoard = [
  [b,b,b,b,b,b,b,b,b],
  [b,b,b,b,b,b,b,b,b],
  [b,b,b,b,b,b,b,b,b],
  [b,b,b,b,b,b,b,b,b],
  [b,b,b,b,b,b,b,b,b],
  [b,b,b,b,b,b,b,b,b],
  [b,b,b,b,b,b,b,b,b],
  [b,b,b,b,b,b,b,b,b],
  [b,b,b,b,b,b,b,b,b]
];

const board = [
  [b, b, b, b, 3, 5, b, b, 8],
  [b, 4, 5, b, b, b, 1, b, b],
  [b, b, b, b, b, b, b, 9, 3],
  [b, b, b, b, 5, b, b, b, b],
  [7, b, b, b, b, 4, 2, 8, b],
  [b, b, b, 3, b, b, 4, b, 9],
  [b, 9, b, 2, b, b, b, 1, b],
  [1, b, b, 7, 9, b, 3, b, b],
  [b, b, 8, b, b, 3, b, 6, b]
];

const solvedBoard = [
  [9, 1, 2, 6, 3, 5, 7, 4, 8],
  [3, 4, 5, 8, 7, 9, 1, 2, 6],
  [8, 6, 7, 4, 2, 1, 5, 9, 3],
  [2, 8, 4, 9, 5, 7, 6, 3, 1],
  [7, 3, 9, 1, 6, 4, 2, 8, 5],
  [6, 5, 1, 3, 8, 2, 4, 7, 9],
  [5, 9, 3, 2, 4, 6, 8, 1, 7],
  [1, 2, 6, 7, 9, 8, 3, 5, 4],
  [4, 7, 8, 5, 1, 3, 9, 6, 2]
];

const {
  createPuzzle,
  getEmptyBoard,
  solve,
  solved,
} = utils;

test('createPuzzle', () => {
  const puzzle = createPuzzle(HARD_PUZZLE.puzzle);

  expect(puzzle).toStrictEqual(board);
});

test('getEmptyBoard', () => {
  const emptyBpard = getEmptyBoard();

  expect(emptyBpard).toStrictEqual(emptyBoard);
});

test('solve', () => {
  const solveFunc = solve(board);

  expect(solveFunc).toStrictEqual(solvedBoard);
});

test('solved returns true when board is solved', () => {
  const solvedBool = solved(solvedBoard);

  expect(solvedBool).toBeTruthy();
});

test('solved returns falsee when board is not solved', () => {
  const unsolvedBool = solved(board);

  expect(unsolvedBool).toBeFalsy();
});