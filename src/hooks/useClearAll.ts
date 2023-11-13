import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { removePoints } from '../app/slices/GASlice';

export default function useClearAll() {
  const dispatch = useDispatch<AppDispatch>();
  const clearAll = () => {
    dispatch(removePoints());
  };

  return clearAll;
}
