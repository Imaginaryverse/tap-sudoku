import { FC } from 'react';
import formatTime from '../utils/formatTime';
import formatPercent from '../utils/formatPercent';

interface IProps {
  difficulty: string;
  timer: number;
  attempts: number;
  accuracy: number;
}

const ResultScreen: FC<IProps> = ({
  difficulty,
  timer,
  attempts,
  accuracy,
}: IProps) => {
  return (
    <div className='result-screen'>
      <h3 className='result-title'>Well done!</h3>

      <p className='result-info'>
        In {attempts < 3 ? 'just' : ''}{' '}
        <b>
          {attempts}
          {attempts > 1 ? ' attempts' : ' attempt'}
        </b>{' '}
        and <b>{formatTime(timer)}</b> you completed a {difficulty} board with{' '}
        <b>{formatPercent(accuracy)}</b> accuracy!
      </p>
    </div>
  );
};

export default ResultScreen;
