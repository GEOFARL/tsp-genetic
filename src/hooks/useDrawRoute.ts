import { MutableRefObject, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectPoints, selectRoute } from '../app/slices/GASlice';
import { selectBoard } from '../app/slices/boardSlice';

export default function useDrawRoute(
  ref: MutableRefObject<HTMLCanvasElement | null>
) {
  const route = useSelector(selectRoute);
  const points = useSelector(selectPoints);

  const { showNumbers, numbersSize, circleRadius, edgeColor, edgeThickness } =
    useSelector(selectBoard);

  useEffect(() => {
    if (ref.current && route.length > 0) {
      const ctx = ref.current.getContext('2d');

      ctx!.strokeStyle = edgeColor;
      ctx!.lineWidth = edgeThickness;
      ctx!.beginPath();

      ctx!.moveTo(points[route[0]].x, points[route[0]].y);
      for (let i = 1; i < route.length; i++) {
        ctx!.lineTo(points[route[i]].x, points[route[i]].y);
      }
      ctx!.lineTo(points[route[0]].x, points[route[0]].y);

      ctx!.stroke();
      ctx!.closePath();
    }
  }, [
    ref,
    route,
    points,
    numbersSize,
    showNumbers,
    circleRadius,
    edgeColor,
    edgeThickness,
  ]);
}
