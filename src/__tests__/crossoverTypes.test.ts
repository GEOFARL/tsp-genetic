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

  describe('orderedCrossover', () => {
    it('should change only expected chromosomes', () => {
      const geneticAlgorithm = new GA(
        points,
        Object.assign({}, config, {
          crossover: Crossover.ORDERED,
          mutation: Mutation.OFF,
        })
      );
      const before = geneticAlgorithm['population'].slice();

      geneticAlgorithm['orderedCrossover'](1, 2);

      const after = geneticAlgorithm['population'].slice();

      expect(before[0]).toEqual(after[0]);
      expect(before[1]).not.toEqual(after[1]);
      expect(before[2]).not.toEqual(after[2]);
    });
  });

  describe('PMXCrossover', () => {
    it('should change only expected chromosomes', () => {
      const geneticAlgorithm = new GA(
        points,
        Object.assign({}, config, {
          crossover: Crossover.PARTIALLY_MAPPED,
          mutation: Mutation.OFF,
        })
      );
      const before = geneticAlgorithm['population'].slice();

      geneticAlgorithm['orderedCrossover'](1, 2);

      const after = geneticAlgorithm['population'].slice();

      expect(before[0]).toEqual(after[0]);
      expect(before[1]).not.toEqual(after[1]);
      expect(before[2]).not.toEqual(after[2]);
    });
  });

  describe('heuristicCrossover', () => {
    it('should change only expected chromosomes', () => {
      const geneticAlgorithm = new GA(
        points,
        Object.assign({}, config, {
          crossover: Crossover.PARTIALLY_MAPPED,
          mutation: Mutation.OFF,
        })
      );
      const before = geneticAlgorithm['population'].slice();

      geneticAlgorithm['heuristicCrossover'](1, 2);

      const after = geneticAlgorithm['population'].slice();

      expect(before[0]).toEqual(after[0]);
      expect(before[1]).not.toEqual(after[1]);
      expect(before[2]).not.toEqual(after[2]);
    });
  });
});
