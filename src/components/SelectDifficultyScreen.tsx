import { FC, useState, useContext } from 'react';
import { appContext } from '../context';

const difficultyLevels = [
  {
    name: 'VERY EASY',
    value: 'very easy',
  },
  {
    name: 'EASY',
    value: 'easy',
  },
  {
    name: 'NORMAL',
    value: 'normal',
  },
  {
    name: 'HARD',
    value: 'hard',
  },
  {
    name: 'VERY HARD',
    value: 'very hard',
  },
];

const SelectDifficultyScreen: FC = () => {
  const { difficulty, selectDifficulty, generateSolvedBoard, startGame } =
    useContext(appContext);

  return (
    <div className='select-difficulty-screen'>
      <h4>Select difficulty:</h4>

      <div className='difficulty-btn-container'>
        {difficultyLevels.map((el, i) => {
          return (
            <button
              className={`btn difficulty-btn ${
                difficulty === el.value ? 'selected' : ''
              }`}
              onClick={() => selectDifficulty(el.value)}
              key={i}
            >
              {el.name}
            </button>
          );
        })}
      </div>

      <button className='btn start-btn' onClick={() => startGame()}>
        START
      </button>
    </div>
  );
};

export default SelectDifficultyScreen;
