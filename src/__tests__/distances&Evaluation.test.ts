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
      { x: 5, y: 7 },
      { x: 9, y: 2 },
      { x: 7, y: 3 },
      { x: 2, y: 6 },
      { x: 8, y: 14 },
    ];
  });

  describe('distances', () => {
    it('should correctly compute distances', () => {
      const geneticAlgorithm = new GA(points, config);

      expect(geneticAlgorithm['distances'][0][1]).toBe(5);
      expect(geneticAlgorithm['distances'][4][5]).toBe(10);
    });

    it('distances should be symmetrical', () => {
      const geneticAlgorithm = new GA(points, config);

      expect(geneticAlgorithm['distances'][0][1]).toEqual(
        geneticAlgorithm['distances'][1][0]
      );

      expect(geneticAlgorithm['distances'][2][3]).toEqual(
        geneticAlgorithm['distances'][3][2]
      );
    });

    it('distances from a point to itself should be 0', () => {
      const geneticAlgorithm = new GA(points, config);

      expect(geneticAlgorithm['distances'][0][0]).toBe(0);
      expect(geneticAlgorithm['distances'][2][2]).toBe(0);
    });
  });
});
