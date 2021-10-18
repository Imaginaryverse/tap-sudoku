import { FC, useContext, useState, useEffect } from 'react';
import {
  appContext,
  TSudokuBoard,
  TSudokuBoardRow,
  TSudokuCell,
} from '../context';
import InfoScreen from './InfoScreen';
import ResultScreen from './ResultScreen';
import CellEditor from './CellEditor';

export type TSelectedCell = {
  value: number;
  candidates: Array<number>;
  rowIndex: number;
  colIndex: number;
} | null;

const SudokuBoard: FC = () => {
  const {
    board,
    checkCorrectness,
    attempts,
    isCorrectSolution,
    difficulty,
    accuracy,
    setGameState,
  } = useContext(appContext);
  const [localBoard, setLocalBoard] = useState<TSudokuBoard>([]);
  const [selectedCell, setSelectedCell] = useState<TSelectedCell>(null);
  const [timer, setTimer] = useState<number>(0);
  const [isIncomplete, setIsComplete] = useState<boolean>(true);

  function selectCell(
    value: number,
    candidates: Array<number>,
    rowIndex: number,
    colIndex: number
  ) {
    setSelectedCell({ value, candidates, rowIndex, colIndex });
  }

  function handleCloseClick() {
    setSelectedCell(null);
  }

  function updateCell(
    value: number,
    candidates: Array<number>,
    rowIndex: number,
    colIndex: number
  ) {
    setLocalBoard(prevState => {
      const updatedBoard = [...prevState];

      updatedBoard[rowIndex][colIndex].value = value;
      updatedBoard[rowIndex][colIndex].candidates = candidates;

      return updatedBoard;
    });
  }

  function increment(rowIndex: number, colIndex: number) {
    if (isCorrectSolution) return;

    const copy = [...board];

    if (copy[rowIndex][colIndex].value === 9) {
      copy[rowIndex][colIndex].value = 0;
      copy[rowIndex][colIndex].incorrect = false;
    } else {
      copy[rowIndex][colIndex].value++;
      copy[rowIndex][colIndex].incorrect = false;
    }

    setLocalBoard(copy);
  }

  useEffect(() => {
    let interval: any;

    if (!isCorrectSolution) {
      interval = setInterval(() => {
        setTimer(prevState => (prevState += 1));
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isCorrectSolution]);

  useEffect(() => {
    setIsComplete(localBoard.some(row => row.some(cell => cell.value === 0)));
  }, [localBoard]);

  useEffect(() => {
    setLocalBoard([...board]);
  }, [board]);

  return (
    <div className='sudoku-game-screen'>
      <table className='sudoku-board' cellPadding='0' cellSpacing='0'>
        <tbody>
          {localBoard.length &&
            localBoard.map((row: TSudokuBoardRow, r: number) => {
              return (
                <tr className='board-row' key={r}>
                  {row.map((cell, c) => (
                    <td
                      className={`board-cell ${cell.isLocked ? 'locked' : ''} ${
                        isCorrectSolution ? 'done' : ''
                      } ${
                        r === selectedCell?.rowIndex &&
                        c === selectedCell.colIndex
                          ? 'selected'
                          : ''
                      }`}
                      onClick={
                        !cell.isLocked
                          ? () =>
                              selectedCell?.rowIndex === r &&
                              selectedCell.colIndex === c
                                ? setSelectedCell(null)
                                : selectCell(cell.value, cell.candidates, r, c)
                          : undefined
                      }
                      key={c}
                    >
                      <p
                        className={
                          !cell.isLocked && isCorrectSolution && cell.isCorrect
                            ? 'correct'
                            : !isCorrectSolution
                            ? 'incorrect'
                            : ''
                        }
                      >
                        {cell.value ? cell.value : null}
                      </p>
                    </td>
                  ))}
                </tr>
              );
            })}
        </tbody>
      </table>

      <div className='bottom-container'>
        {selectedCell && (
          <CellEditor
            value={selectedCell.value}
            candidates={selectedCell.candidates}
            rowIndex={selectedCell.rowIndex}
            colIndex={selectedCell.colIndex}
            onClose={handleCloseClick}
            onCellChange={updateCell}
          />
        )}

        {!selectedCell &&
          (!isCorrectSolution ? (
            <InfoScreen
              difficulty={difficulty}
              timer={timer}
              attempts={attempts}
              accuracy={accuracy}
            />
          ) : (
            <ResultScreen
              difficulty={difficulty}
              timer={timer}
              attempts={attempts}
              accuracy={accuracy}
            />
          ))}
      </div>

      <div className='game-btn-container'>
        <button
          className='btn back-btn'
          onClick={() => setGameState('IN_SELECT_DIFFICULTY')}
        >
          {isCorrectSolution ? 'Play Again' : 'Back'}
        </button>
        {!isCorrectSolution && (
          <button
            className='btn try-solution-btn'
            onClick={() => checkCorrectness(localBoard)}
            disabled={isCorrectSolution || isIncomplete}
          >
            Try Solution
          </button>
        )}
      </div>
    </div>
  );
};

export default SudokuBoard;
