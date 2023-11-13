import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../app/store';
import GA from '../GA/GA';
import { selectPoints, setRoute } from '../app/slices/GASlice';

export default function useStartAlgorithm() {
  const dispatch = useDispatch<AppDispatch>();
  const points = useSelector(selectPoints);

  const startAlgo = () => {
    const geneticAlgorithm = new GA(points);

    const route = geneticAlgorithm.getRoute();

    dispatch(setRoute(route));
  };

  return startAlgo;
}
