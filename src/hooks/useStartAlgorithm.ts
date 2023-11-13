import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../app/store';
import GA from '../GA/GA';
import { selectConfig, selectPoints, setRoute } from '../app/slices/GASlice';
import { selectParameters } from '../app/slices/algorithmParametersSlice';

export default function useStartAlgorithm() {
  const dispatch = useDispatch<AppDispatch>();
  const points = useSelector(selectPoints);
  const config = useSelector(selectConfig);
  const parameters = useSelector(selectParameters);

  const startAlgo = () => {
    const geneticAlgorithm = new GA(points, { ...config, ...parameters });

    const route = geneticAlgorithm.getRoute();

    dispatch(setRoute(route));
  };

  return startAlgo;
}