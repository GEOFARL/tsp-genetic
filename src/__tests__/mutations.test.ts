import GA from '../GA/GA';
import { Crossover, LocalImprovement, Mutation } from '../types';

describe('GA', () => {
  // eslint-disable-next-line
  let config: any, points: any;

  beforeEach(() => {
    config = {
      populationSize: 3,
      crossoverProbability: 1,
      mutationProbability: 1,
      localImprovementProbability: 1,
      crossover: Crossover.HEURISTIC,
      mutation: Mutation.SWAP,
      localImprovement: LocalImprovement.OFF,
      isAsymmetric: false,
    };

    points = [
      { x: 1, y: 4 },
      { x: 5, y: 8 },
      { x: 9, y: 2 },
      { x: 7, y: 3 },
      { x: 2, y: 6 },
      { x: 1, y: 8 },
    ];
  });
  describe('mutation', () => {
    it('should call an appropriate type', () => {
      const geneticAlgorithm = new GA(
        points,
        Object.assign({}, config, { mutation: Mutation.SWAP })
      );
      // eslint-disable-next-line
      const spy = jest.spyOn(geneticAlgorithm as any, 'swapMutate');

      geneticAlgorithm['mutation']();

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('swapMutate', () => {
    it('should change chromosome structure', () => {
      const geneticAlgorithm = new GA(
        points,
        Object.assign({}, config, { mutation: Mutation.SWAP })
      );

      const beforeChromosome = [1, 4, 6, 2, 5];

      const afterChromosome = geneticAlgorithm['swapMutate'](beforeChromosome);

      expect(beforeChromosome).not.toEqual(afterChromosome);
    });
  });

  describe('displacementMutate', () => {
    it('should change chromosome structure', () => {
      const geneticAlgorithm = new GA(
        points,
        Object.assign({}, config, { mutation: Mutation.DISPLACEMENT })
      );

      const beforeChromosome = [1, 4, 6, 2, 5];

      const afterChromosome =
        geneticAlgorithm['displacementMutate'](beforeChromosome);

      expect(beforeChromosome).not.toBe(afterChromosome);
    });
  });
});
