import { TSudokuBoard } from '../context';
import { shuffleArray } from './arrayUtils';
const N = 9;

function isSafe(
  board: Array<Array<number>>,
  row: number,
  col: number,
  num: number
) {
  // Check if num occurs in row
  for (let c = 0; c < board.length; c++) {
    if (board[row][c] == num) return false;
  }

  // Check if num occurs in column
  for (let r = 0; r < board.length; r++) {
    if (board[r][col] == num) return false;
  }

  // Check if num occurs in sub-grid
  const sqrt = Math.floor(Math.sqrt(board.length));
  const boxRowStart = row - (row % sqrt);
  const boxColStart = col - (col % sqrt);
  for (let r = boxRowStart; r < boxRowStart + sqrt; r++) {
    for (let c = boxColStart; c < boxColStart + sqrt; c++) {
      if (board[r][c] == num) return false;
    }
  }

  // Num is safe to place
  return true;
}

function solveSudoku(board: Array<Array<number>>, n: number) {
  let row = -1;
  let col = -1;
  let isEmpty = true;

  // Iterate by row in board
  for (let r = 0; r < n; r++) {
    // Iterate by col in row
    for (let c = 0; c < n; c++) {
      // If element is zero
      if (board[r][c] === 0) {
        row = r;
        col = c;

        // element is missing a value
        isEmpty = false;
        break;
      }

      if (!isEmpty) {
        break;
      }
    }
  }

  // If no empty spaces left
  if (isEmpty) return true;

  // Otherwise backtrack
  for (let num = 1; num <= n; num++) {
    if (isSafe(board, row, col, num)) {
      board[row][col] = num;

      if (solveSudoku(board, n)) {
        return true;
      } else {
        board[row][col] = 0;
      }
    }
  }
  return false;
}

function generateSolution() {
  const protoBoard = [
    shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]),
    new Array(9).fill(0),
    new Array(9).fill(0),
    new Array(9).fill(0),
    new Array(9).fill(0),
    new Array(9).fill(0),
    new Array(9).fill(0),
    new Array(9).fill(0),
    new Array(9).fill(0),
  ];

  if (solveSudoku(protoBoard, N)) {
    return [...protoBoard];
  } else {
    throw new Error('Could not generate board...');
  }
}

function generateStartingBoard(array: Array<Array<number>>) {
  const startingBoard: TSudokuBoard = array.map(row =>
    row.map(num => {
      return {
        value: num,
        locked: num !== 0,
        incorrect: false,
      };
    })
  );

  return startingBoard;
}

function pokeHolesInBoard(board: TSudokuBoard, holes: number) {
  const newArr = [...board];
  let pokes = 0;

  while (pokes < holes) {
    const val = Math.floor(Math.random() * 81);
    const randomRowIndex = Math.floor(val / 9);
    const randomColIndex = val % 9;

    if (newArr[randomRowIndex][randomColIndex].value !== 0) {
      newArr[randomRowIndex][randomColIndex].value = 0;
      newArr[randomRowIndex][randomColIndex].locked = false;
      pokes++;
    }
  }

  return newArr;
}

export {
  solveSudoku,
  generateSolution,
  generateStartingBoard,
  pokeHolesInBoard,
};
