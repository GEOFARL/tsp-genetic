import { useDispatch, useSelector } from 'react-redux';
import { selectBoard } from '../app/slices/boardSlice';
import { getRandomNumber } from '../utils';
import { IPoint } from '../types';
import { AppDispatch } from '../app/store';
import { addPoints } from '../app/slices/GASlice';

export default function useGeneratePoints() {
  const { HEIGHT, WIDTH } = useSelector(selectBoard);
  const dispatch = useDispatch<AppDispatch>();

  const getRandomPoint = (): IPoint | null => {
    if (!HEIGHT || !WIDTH) return null;
    const x = getRandomNumber(0, WIDTH);
    const y = getRandomNumber(0, HEIGHT);

    return { x, y };
  };

  const generatePoints = (numberOfPoints: number) => {
    const points = [];

    for (let i = 0; i < numberOfPoints; i += 1) {
      const randomPoint = getRandomPoint();
      if (randomPoint === null) break;

      points.push(randomPoint);
    }

    if (points.length === numberOfPoints) {
      dispatch(addPoints(points));
    }
  };

  return generatePoints;
}
