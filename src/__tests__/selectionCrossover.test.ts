import GA from '../GA/GA';
import { Crossover, LocalImprovement, Mutation } from '../types';

describe('GA', () => {
  // eslint-disable-next-line
  let config: any, points: any;

  beforeEach(() => {
    config = {
      populationSize: 10,
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
  describe('selection', () => {
    it('should produce a number of chromosomes that was initially set', () => {
      const geneticAlgorithm = new GA(points, config);

      const lengthBefore = geneticAlgorithm['population'].length;

      geneticAlgorithm['selection']();

      const lengthAfter = geneticAlgorithm['population'].length;

      expect(lengthBefore).toEqual(lengthAfter);
    });

    it('should produce a different chromosomes', () => {
      const geneticAlgorithm = new GA(points, config);

      const chromosomesBefore = geneticAlgorithm['population'].slice();

      geneticAlgorithm['selection']();

      const chromosomesAfter = geneticAlgorithm['population'].slice();

      const equal = chromosomesBefore.every((chromosome, i) => {
        return (
          JSON.stringify(chromosome) === JSON.stringify(chromosomesAfter[i])
        );
      });

      expect(equal).toBe(false);
    });
  });

  describe('crossover', () => {
    it('should call an appropriate type', () => {
      const geneticAlgorithm = new GA(
        points,
        Object.assign({}, config, { crossover: Crossover.HEURISTIC })
      );
      // eslint-disable-next-line
      const spy = jest.spyOn(geneticAlgorithm as any, 'heuristicCrossover');

      geneticAlgorithm['crossover']();

      expect(spy).toHaveBeenCalled();
    });
  });
});
