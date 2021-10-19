import { FC } from 'react';
import formatTime from '../utils/formatTime';
import formatPercent from '../utils/formatPercent';

interface IProps {
  difficulty: string;
  timer: number;
  attempts: number;
  accuracy: number;
  numOfFilled: number;
  numOfHoles: number;
}

const InfoScreen: FC<IProps> = ({
  difficulty,
  timer,
  numOfFilled,
  numOfHoles,
  attempts,
  accuracy,
}: IProps) => {
  return (
    <div className='info-screen'>
      <p className='info'>
        <b>Difficulty</b>: <span className='info-difficulty'>{difficulty}</span>
      </p>
      <p className='info'>
        <b>Filled cells</b>: {numOfFilled} of {numOfHoles}
      </p>
      <p className='info'>
        <b>Elapsed time</b>: {formatTime(timer)}
      </p>
      <p className='info'>
        <b>Number of attempts</b>: {attempts}
      </p>
      <p className='info'>
        <b>Accuracy</b>: {attempts ? formatPercent(accuracy) : 'No attemps'}
      </p>
    </div>
  );
};

export default InfoScreen;
