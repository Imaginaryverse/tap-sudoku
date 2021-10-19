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
    numOfHoles,
    setGameState,
  } = useContext(appContext);
  const [localBoard, setLocalBoard] = useState<TSudokuBoard>([]);
  const [selectedCell, setSelectedCell] = useState<TSelectedCell>(null);
  const [timer, setTimer] = useState<number>(0);
  const [numOfFilled, setNumOfFilled] = useState<number>(0);
  const [isIncomplete, setIsComplete] = useState<boolean>(true);

  function resetHighlight(board: TSudokuBoard) {
    const resetBoard = board.map(row => {
      return row.map(cell => {
        return { ...cell, isHighlighted: false };
      });
    });

    return resetBoard;
  }

  function highlightCells(rowIndex: number, colIndex: number) {
    setLocalBoard(prevState => {
      const highlightedBoard = resetHighlight(prevState);

      highlightedBoard[rowIndex].forEach(cell => (cell.isHighlighted = true));

      highlightedBoard.forEach(row => (row[colIndex].isHighlighted = true));

      const boxRowStart = rowIndex - (rowIndex % 3);
      const boxColStart = colIndex - (colIndex % 3);

      for (let r = boxRowStart; r < boxRowStart + 3; r++) {
        for (let c = boxColStart; c < boxColStart + 3; c++) {
          highlightedBoard[r][c].isHighlighted = true;
        }
      }

      highlightedBoard[rowIndex][colIndex].isHighlighted = false;

      return highlightedBoard;
    });
  }

  function selectCell(
    value: number,
    candidates: Array<number>,
    rowIndex: number,
    colIndex: number
  ) {
    highlightCells(rowIndex, colIndex);
    setSelectedCell({ value, candidates, rowIndex, colIndex });
  }

  function handleCloseClick() {
    setSelectedCell(null);
    setLocalBoard(prevState => resetHighlight(prevState));
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
      updatedBoard[rowIndex][colIndex].showCorrectness = false;
      updatedBoard[rowIndex][colIndex].isCorrect = false;

      return updatedBoard;
    });
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
    let filledCells = 0;
    localBoard.forEach(row => {
      row.forEach(cell => {
        if (!cell.isLocked && cell.value) {
          filledCells += 1;
        }
      });
    });

    setNumOfFilled(filledCells);
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
                      } ${cell.isHighlighted ? 'highlight' : ''}`}
                      onClick={
                        !cell.isLocked
                          ? () =>
                              selectedCell?.rowIndex === r &&
                              selectedCell.colIndex === c
                                ? handleCloseClick()
                                : selectCell(cell.value, cell.candidates, r, c)
                          : undefined
                      }
                      key={c}
                    >
                      <p
                        className={`cell-value ${
                          !cell.isLocked && cell.showCorrectness
                            ? cell.isCorrect
                              ? 'correct'
                              : 'incorrect'
                            : ''
                        }`}
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
        <div className={`info-wrapper ${!selectedCell ? 'open' : ''}`}>
          {!isCorrectSolution ? (
            <InfoScreen
              difficulty={difficulty}
              timer={timer}
              numOfFilled={numOfFilled}
              numOfHoles={numOfHoles}
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
          )}
        </div>
        <div className={`cell-editor-wrapper ${selectedCell ? 'open' : ''}`}>
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
        </div>
      </div>

      <div className='game-btn-container'>
        <button
          className={`btn ${isCorrectSolution ? 'play-again-btn' : 'quit-btn'}`}
          onClick={() => setGameState('IN_SELECT_DIFFICULTY')}
        >
          {isCorrectSolution ? 'Play Again' : 'Quit'}
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
