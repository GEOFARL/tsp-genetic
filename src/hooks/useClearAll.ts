import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { clearAll as clearAllBoard } from '../app/slices/GASlice';

export default function useClearAll() {
  const dispatch = useDispatch<AppDispatch>();
  const clearAll = () => {
    dispatch(clearAllBoard());
  };

  return clearAll;
}
