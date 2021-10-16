import { FC, useContext } from 'react';
import './styles/App.css';
import SelectDifficultyScreen from './components/SelectDifficultyScreen';
import { appContext } from './context';
import SudokuGameScreen from './components/SudokuGameScreen';

const App: FC = () => {
  const { board, gameState } = useContext(appContext);
  return (
    <div className='App'>
      <h2 style={{ marginBottom: '1rem' }}>TAP SUDOKU</h2>

      {gameState === 'IN_SELECT_DIFFICULTY' ? <SelectDifficultyScreen /> : null}

      {board.length ? <SudokuGameScreen /> : null}
    </div>
  );
};

export default App;
