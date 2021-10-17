import { FC, useContext, useState, useEffect } from 'react';
import { appContext, TSudokuBoard, TSudokuBoardRow } from '../context';
import formatTime from '../utils/formatTime';
import formatPercent from '../utils/formatPercent';
import InfoScreen from './InfoScreen';
import ResultScreen from './ResultScreen';

const SudokuBoard: FC = () => {
  const {
    board,
    checkCorrectness,
    attempts,
    isCorrectSolution,
    difficulty,
    accuracy,
    goBack,
  } = useContext(appContext);
  const [localBoard, setLocalBoard] = useState<TSudokuBoard>([]);
  const [timer, setTimer] = useState<number>(0);

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

  function isGray(row: number, col: number) {
    if (row === 3 || row === 4 || row === 5) {
      if (col === 3 || col === 4 || col === 5) {
        return 'is-gray';
      }
    } else if (
      col === 0 ||
      col === 1 ||
      col === 2 ||
      col === 6 ||
      col === 7 ||
      col === 8
    ) {
      return 'is-gray';
    } else {
      return '';
    }
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
    setLocalBoard([...board]);
  }, [board]);

  return (
    <div className='sudoku-game-screen'>
      <table className='sudoku-board' cellPadding='0' cellSpacing='0'>
        <tbody>
          {localBoard.length
            ? localBoard.map((row: TSudokuBoardRow, r: number) => {
                return (
                  <tr className='board-row' key={r}>
                    {row.map((cell, c) => (
                      <td
                        className={`board-cell ${isGray(r, c)} ${
                          cell.locked ? 'locked' : ''
                        } ${isCorrectSolution ? 'done' : ''}`}
                        onClick={
                          !cell.locked ? () => increment(r, c) : undefined
                        }
                        key={c}
                      >
                        <p
                          className={`cell-value ${
                            cell.incorrect ? 'incorrect' : ''
                          } ${
                            isCorrectSolution && !cell.locked && !cell.incorrect
                              ? 'correct'
                              : ''
                          }`}
                        >
                          {cell.value ? cell.value : null}
                        </p>
                      </td>
                    ))}
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>

      {!isCorrectSolution ? (
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
      )}

      {/* <div className='info-screen'>
        {isCorrectSolution ? <h3 className='success-msg'>WELL DONE!</h3> : ''}

        <p className='info'>
          <b>Difficulty</b>: {difficulty}
        </p>
        <p className='info'>
          <b>Elapsed time</b>: {formatTime(timer)}
        </p>
        <p className='info'>
          <b>Number of attempts</b>: {attempts}
        </p>
        <p className='info'>
          <b>Accuracy</b>: {formatPercent(accuracy)}
        </p>
      </div> */}
      <div className='game-btn-container'>
        <button className='btn back-btn' onClick={() => goBack()}>
          {isCorrectSolution ? 'Play Again' : 'Back'}
        </button>
        {!isCorrectSolution ? (
          <button
            className='btn try-solution-btn'
            onClick={() => checkCorrectness(localBoard)}
            disabled={isCorrectSolution}
          >
            Try Solution
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default SudokuBoard;
