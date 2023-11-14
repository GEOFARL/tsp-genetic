import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectPoints, selectRoute } from '../app/slices/GASlice';
import { IPoint } from '../types';
import { selectBoard } from '../app/slices/boardSlice';

const calculateRadius = (radius: number) => {
  return radius * 4 * ((1.8 / radius) * Math.log(2.5 * (radius + 1)));
};

export default function useDrawPoints(
  ref: React.MutableRefObject<HTMLCanvasElement | null>
) {
  const points = useSelector(selectPoints);
  const route = useSelector(selectRoute);
  const {
    WIDTH,
    HEIGHT,
    showNumbers,
    numbersSize,
    circleRadius,
    edgeColor,
    edgeThickness,
  } = useSelector(selectBoard);

  useEffect(() => {
    let ctx;
    if (ref.current) {
      ctx = ref.current.getContext('2d');
      ctx!.clearRect(0, 0, WIDTH!, HEIGHT!);
    }

    if (points.length > 0 && ref.current) {
      const drawCircle = (point: IPoint, index: number) => {
        let radius = circleRadius;
        let distance = circleRadius + 3;
        let fontSize = numbersSize;
        if (index === 1) {
          ctx!.fillStyle = '#00ff00';
          radius = calculateRadius(radius);
          distance = radius + 3;
          fontSize = fontSize + fontSize * 0.6;
        } else if (index === points.length) {
          ctx!.fillStyle = '#ff0000';
          radius = calculateRadius(radius);
          distance = radius + 3;
          fontSize = fontSize + fontSize * 0.6;
        } else {
          ctx!.fillStyle = '#000';
        }
        ctx!.beginPath();
        ctx!.arc(point.x, point.y, radius, 0, Math.PI * 2, true);
        ctx!.closePath();
        ctx!.fill();
        if (showNumbers) {
          ctx!.font = `${fontSize}px serif`;
          ctx!.fillText(`${index}`, point.x + distance, point.y + distance);
        }
      };

      for (let i = 0; i < points.length; i += 1) {
        drawCircle(points[i], i + 1);
      }
    }
  }, [
    ref,
    points,
    WIDTH,
    HEIGHT,
    showNumbers,
    numbersSize,
    route,
    circleRadius,
    edgeColor,
    edgeThickness,
  ]);
}
