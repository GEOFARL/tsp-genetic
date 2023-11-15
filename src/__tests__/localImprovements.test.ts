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
  describe('localImprovement', () => {
    it('should call an appropriate type', () => {
      const geneticAlgorithm = new GA(
        points,
        Object.assign({}, config, {
          localImprovement: LocalImprovement.TWO_OPT,
        })
      );
      // eslint-disable-next-line
      const spy = jest.spyOn(geneticAlgorithm as any, 'twoOpt');

      geneticAlgorithm['localImprovement']();

      expect(spy).toHaveBeenCalled();
    });
  });

  describe('twoOpt', () => {
    it('should only change the first chromosome out of population', () => {
      const geneticAlgorithm = new GA(
        points,
        Object.assign({}, config, {
          localImprovement: LocalImprovement.TWO_OPT,
        })
      );

      const beforePopulation = geneticAlgorithm['population'].slice();

      geneticAlgorithm['twoOpt']();

      const afterPopulation = geneticAlgorithm['population'].slice();

      expect(beforePopulation[1]).toEqual(afterPopulation[1]);
      expect(beforePopulation[2]).toEqual(afterPopulation[2]);
    });

    it('should at least not degrade evaluation of the chromosome', () => {
      const geneticAlgorithm = new GA(
        points,
        Object.assign({}, config, {
          localImprovement: LocalImprovement.TWO_OPT,
        })
      );

      const chromosomeEvaluationBefore = geneticAlgorithm['evaluate'](
        geneticAlgorithm['population'][0]
      );

      geneticAlgorithm['twoOpt']();

      const chromosomeEvaluationAfter = geneticAlgorithm['evaluate'](
        geneticAlgorithm['population'][0]
      );

      expect(chromosomeEvaluationAfter).toBeLessThanOrEqual(
        chromosomeEvaluationBefore
      );
    });
  });

  describe('threeOpt', () => {
    it('should only change the first chromosome out of population', () => {
      const geneticAlgorithm = new GA(
        points,
        Object.assign({}, config, {
          localImprovement: LocalImprovement.THREE_OPT,
        })
      );

      const beforePopulation = geneticAlgorithm['population'].slice();

      geneticAlgorithm['threeOpt']();

      const afterPopulation = geneticAlgorithm['population'].slice();

      expect(beforePopulation[1]).toEqual(afterPopulation[1]);
      expect(beforePopulation[2]).toEqual(afterPopulation[2]);
    });

    it('should at least not degrade evaluation of the chromosome', () => {
      const geneticAlgorithm = new GA(
        points,
        Object.assign({}, config, {
          localImprovement: LocalImprovement.THREE_OPT,
        })
      );

      const chromosomeEvaluationBefore = geneticAlgorithm['evaluate'](
        geneticAlgorithm['population'][0]
      );

      geneticAlgorithm['threeOpt']();

      const chromosomeEvaluationAfter = geneticAlgorithm['evaluate'](
        geneticAlgorithm['population'][0]
      );

      expect(chromosomeEvaluationAfter).toBeLessThanOrEqual(
        chromosomeEvaluationBefore
      );
    });
  });
});
