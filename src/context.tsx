import { FC, createContext, useState, useEffect } from 'react';
import {
  generateSolution,
  generateStartingBoard,
  pokeHolesInBoard,
} from './utils/boardGenerators';

export type TGameState = 'IN_SELECT_DIFFICULTY' | 'IN_GAME';
export type TSudokuCell = {
  value: number;
  locked: boolean;
  incorrect: boolean;
};
export type TSudokuBoardRow = Array<TSudokuCell>;
export type TSudokuBoard = Array<TSudokuBoardRow>;
export type TSolvedBoard = Array<Array<number>>;
export type TDifficulty =
  | 'very easy'
  | 'easy'
  | 'normal'
  | 'hard'
  | 'very hard';

export const appContext = createContext<any>(null);

const Context: FC = ({ children }) => {
  const [gameState, setGameState] = useState<TGameState>(
    'IN_SELECT_DIFFICULTY'
  );
  const [difficulty, setDifficulty] = useState<TDifficulty>('normal');
  const [numOfHoles, setNumOfHoles] = useState<number>(40);
  const [solvedBoard, setSolvedBoard] = useState<TSolvedBoard>([]);
  const [board, setBoard] = useState<TSudokuBoard>([]);
  const [attempts, setAttempts] = useState<number>(0);
  const [accuracy, setAccuracy] = useState<number>(0);
  const [isCorrectSolution, setIsCorrectSolution] = useState<boolean>(false);

  function selectDifficulty(difficulty: TDifficulty) {
    switch (difficulty) {
      case 'very easy':
        setNumOfHoles(15);
        break;
      case 'easy':
        setNumOfHoles(25);
        break;
      case 'normal':
        setNumOfHoles(40);
        break;
      case 'hard':
        setNumOfHoles(55);
        break;
      case 'very hard':
        setNumOfHoles(64);
        break;
      default:
        setNumOfHoles(40);
        break;
    }

    return setDifficulty(difficulty);
  }

  function generateSolvedBoard() {
    setSolvedBoard(generateSolution());
  }

  function generateBoard(board: Array<Array<number>>) {
    const objectBoard = generateStartingBoard([...board]);
    const startingBoard = pokeHolesInBoard(objectBoard, numOfHoles);
    setBoard(startingBoard);
  }

  function checkCorrectness(attemptBoard: TSudokuBoard) {
    setAttempts(prevState => (prevState += 1));
    const checkedBoard = [...attemptBoard];

    for (let row in checkedBoard) {
      for (let col in checkedBoard[row]) {
        if (
          !checkedBoard[row][col].locked &&
          checkedBoard[row][col].value !== solvedBoard[row][col]
        ) {
          checkedBoard[row][col].incorrect = true;
        }
      }
    }

    if (
      checkedBoard.every((row, rowIndex) =>
        row.every(
          (col, colIndex) => col.value === solvedBoard[rowIndex][colIndex]
        )
      )
    ) {
      setIsCorrectSolution(true);
    }

    setBoard(checkedBoard);
  }

  function calculateAccuracy(
    attempts: number,
    numOfHoles: number,
    board: TSudokuBoard
  ) {
    let totalCorrectVals = 0;
    for (let row in board) {
      for (let col in board[row]) {
        if (
          !board[row][col].locked &&
          board[row][col].value === solvedBoard[row][col]
        ) {
          totalCorrectVals += 1;
        }
      }
    }

    const misses: number = (totalCorrectVals / numOfHoles) * attempts;
    setAccuracy(100 - misses);
  }

  function startGame() {
    const solution = generateSolution();
    setSolvedBoard(solution);
    generateBoard(solution);
    setGameState('IN_GAME');
  }

  function goBack() {
    setGameState('IN_SELECT_DIFFICULTY');
    setSolvedBoard([]);
    setBoard([]);
    setAttempts(0);
    setIsCorrectSolution(false);
  }

  useEffect(() => {
    calculateAccuracy(attempts, numOfHoles, board);
  }, [attempts]);

  return (
    <appContext.Provider
      value={{
        gameState,
        setGameState,
        difficulty,
        selectDifficulty,
        board,
        generateSolvedBoard,
        startGame,
        checkCorrectness,
        attempts,
        isCorrectSolution,
        goBack,
        accuracy,
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export default Context;
