import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../app/store';
import GA from '../GA/GA';
import {
  selectConfig,
  selectPoints,
  setGenerationCount,
  setIntervalId,
  setRoute,
} from '../app/slices/GASlice';
import { selectParameters } from '../app/slices/algorithmParametersSlice';
import { selectUpdateRate } from '../app/slices/boardSlice';

export default function useStartAlgorithm() {
  const dispatch = useDispatch<AppDispatch>();
  const points = useSelector(selectPoints);
  const config = useSelector(selectConfig);
  const parameters = useSelector(selectParameters);
  const updateRate = useSelector(selectUpdateRate);

  const startAlgo = () => {
    const geneticAlgorithm = new GA(points, { ...config, ...parameters });
    const id = setInterval(() => {
      const route = geneticAlgorithm.getRoute();
      dispatch(setRoute(route));
      dispatch(setGenerationCount(geneticAlgorithm.getGenerationCount()));
    }, updateRate);

    dispatch(setIntervalId(id));
  };

  return startAlgo;
}
