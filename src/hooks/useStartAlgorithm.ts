import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../app/store';
import GA from '../GA/GA';
import {
  selectConfig,
  selectIsPaused,
  selectPoints,
  setGenerationCount,
  setIntervalId,
  setRoute,
  setTotalDistance,
} from '../app/slices/GASlice';
import { selectParameters } from '../app/slices/algorithmParametersSlice';
import { selectUpdateRate } from '../app/slices/boardSlice';

let isPausedOuter = false;

export default function useStartAlgorithm() {
  const dispatch = useDispatch<AppDispatch>();
  const points = useSelector(selectPoints);
  const config = useSelector(selectConfig);
  const parameters = useSelector(selectParameters);
  const updateRate = useSelector(selectUpdateRate);
  const isPaused = useSelector(selectIsPaused);
  isPausedOuter = isPaused;

  const startAlgo = () => {
    isPausedOuter = false;
    const geneticAlgorithm = new GA(points, { ...config, ...parameters });
    const id = setInterval(() => {
      if (!isPausedOuter) {
        const route = geneticAlgorithm.getRoute();
        dispatch(setRoute(route));
        dispatch(setGenerationCount(geneticAlgorithm.getGenerationCount()));
        dispatch(setTotalDistance(geneticAlgorithm.getTotalDistance()));
      }
    }, updateRate);

    dispatch(setIntervalId(id));
  };

  return startAlgo;
}
