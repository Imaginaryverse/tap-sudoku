import { FC, useState, useEffect } from 'react';
import { TSelectedCell } from './SudokuGameScreen';

interface IProps {
  value: number;
  candidates: Array<number>;
  rowIndex: number;
  colIndex: number;
  onClose: () => void;
  onCellChange: (
    value: number,
    candidates: Array<number>,
    rowIndex: number,
    colIndex: number
  ) => void;
}

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const CellEditor: FC<IProps> = ({
  value,
  candidates,
  rowIndex,
  colIndex,
  onClose,
  onCellChange,
}: IProps) => {
  const [selectedVal, setSelectedVal] = useState<number>(value);
  const [selectedCandidates, setSelectedCandidates] =
    useState<Array<number>>(candidates);

  function handleCandidateClick(candidate: number) {
    setSelectedCandidates(prevState =>
      prevState.includes(candidate)
        ? prevState.filter(num => num !== candidate)
        : [...prevState, candidate]
    );
  }

  useEffect(() => {
    onCellChange(selectedVal, selectedCandidates, rowIndex, colIndex);
  }, [selectedVal, selectedCandidates]);

  useEffect(() => {
    setSelectedVal(value);
    setSelectedCandidates(candidates);
  }, [rowIndex, colIndex]);

  return (
    <div className='cell-editor'>
      <ul className='cell-value-list'>
        {numbers.map(val => {
          return (
            <button
              className={`btn val-btn ${val === selectedVal ? 'selected' : ''}`}
              onClick={() => setSelectedVal(val === selectedVal ? 0 : val)}
            >
              {val}
            </button>
          );
        })}
      </ul>

      <ul className='cell-candidates-list'>
        {numbers.map(candidate => {
          return (
            <button
              className={`btn candidate-btn ${
                selectedCandidates.includes(candidate) ? 'selected' : ''
              }`}
              onClick={() => handleCandidateClick(candidate)}
            >
              {candidate}
            </button>
          );
        })}
      </ul>

      {/* <div className='editor-btn-container'>
        <button className='btn close-edit-btn' onClick={() => onClose()}>
          Close
        </button>
      </div> */}
    </div>
  );
};

export default CellEditor;
