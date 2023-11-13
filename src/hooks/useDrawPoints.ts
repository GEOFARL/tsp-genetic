import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectPoints } from '../app/slices/GASlice';
import { IPoint } from '../types';
import { selectBoard } from '../app/slices/boardSlice';

export default function useDrawPoints(
  ref: React.MutableRefObject<HTMLCanvasElement | null>
) {
  const points = useSelector(selectPoints);
  const { WIDTH, HEIGHT } = useSelector(selectBoard);

  useEffect(() => {
    if (points.length > 0 && ref.current) {
      const ctx = ref.current.getContext('2d');

      const drawCircle = (point: IPoint, index: number) => {
        if (index === 1) {
          ctx!.fillStyle = '#00ff00';
        } else if (index === points.length) {
          ctx!.fillStyle = '#ff0000';
        } else {
          ctx!.fillStyle = '#000';
        }
        ctx!.beginPath();
        ctx!.arc(point.x, point.y, 2, 0, Math.PI * 2, true);
        ctx!.closePath();
        ctx!.fill();
        ctx!.fillText(`${index}`, point.x + 5, point.y + 5);
      };

      ctx!.clearRect(0, 0, WIDTH!, HEIGHT!);
      for (let i = 0; i < points.length; i += 1) {
        drawCircle(points[i], i + 1);
      }
    }
  }, [ref, points, WIDTH, HEIGHT]);
}
