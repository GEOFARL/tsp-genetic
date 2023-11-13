import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { init } from '../app/slices/boardSlice';

export default function useBoard() {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (ref.current) {
      const WIDTH = ref.current?.width;
      const HEIGHT = ref.current?.height;
      dispatch(init({ HEIGHT, WIDTH }));
    }
  }, [ref, dispatch]);
  return { ref };
}
