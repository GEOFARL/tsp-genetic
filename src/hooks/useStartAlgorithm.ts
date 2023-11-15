import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../app/store';
import GA from '../GA/GA';
import {
  addGenerationDistance,
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

import { v4 as uuidv4 } from 'uuid';

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
    const runId = uuidv4();
    const geneticAlgorithm = new GA(points, { ...config, ...parameters });
    dispatch(
      addGenerationDistance([
        runId,
        [
          geneticAlgorithm.getGenerationCount(),
          geneticAlgorithm.getTotalDistance(),
        ],
      ])
    );

    const id = setInterval(() => {
      if (!isPausedOuter) {
        const route = geneticAlgorithm.getRoute();

        const generationNumber = geneticAlgorithm.getGenerationCount();
        const distance = geneticAlgorithm.getTotalDistance();

        dispatch(setRoute(route));
        dispatch(setGenerationCount(generationNumber));
        dispatch(setTotalDistance(distance));

        if (generationNumber % 20 === 0) {
          dispatch(
            addGenerationDistance([runId, [generationNumber, distance]])
          );
        }
      }
    }, updateRate);

    dispatch(setIntervalId(id as unknown as number));
  };

  return startAlgo;
}
