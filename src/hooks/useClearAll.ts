import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import {
  clearAll as clearAllBoard,
  clearAllStats,
} from '../app/slices/GASlice';

export default function useClearAll() {
  const dispatch = useDispatch<AppDispatch>();
  const clearAll = () => {
    dispatch(clearAllBoard());
    dispatch(clearAllStats());
  };

  return clearAll;
}
