import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { setIntervalId, setIsPaused } from '../app/slices/GASlice';

export default function useReset() {
  const dispatch = useDispatch<AppDispatch>();

  const reset = () => {
    dispatch(setIntervalId(null));
    dispatch(setIsPaused(false));
  };

  return reset;
}
