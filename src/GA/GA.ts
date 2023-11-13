import {
  Crossover,
  GAConfig,
  IPoint,
  LocalImprovement,
  Mutation,
} from '../types';
import { shuffle } from '../utils';

export default class GA {
  private points: IPoint[];
  private distances: number[][] = [];
  private population: number[][] = [];

  private readonly CROSSOVER_TYPE: Crossover;
  private readonly MUTATION_TYPE: Mutation;
  private readonly LOCAL_IMPROVEMENT_TYPE: LocalImprovement;

  private readonly CROSSOVER_PROBABILITY: number;
  private readonly MUTATION_PROBABILITY: number;
  private readonly POPULATION_SIZE: number;

  constructor(points: IPoint[], config: GAConfig) {
    this.points = points;

    const {
      crossover,
      crossoverProbability,
      localImprovement,
      mutation,
      mutationProbability,
      populationSize,
    } = config;

    this.CROSSOVER_TYPE = crossover;
    this.MUTATION_TYPE = mutation;
    this.LOCAL_IMPROVEMENT_TYPE = localImprovement;

    this.POPULATION_SIZE = populationSize;
    this.CROSSOVER_PROBABILITY = crossoverProbability;
    this.MUTATION_PROBABILITY = mutationProbability;

    this.computeDistances();
    this.generatePopulation();
  }

  public getRoute(): number[] {}

  private getNextGeneration() {}

  private computeDistances() {
    for (let i = 0; i < this.points.length; i += 1) {
      this.distances.push(new Array<number>(this.points.length));
      for (let j = 0; j < this.points.length; j += 1) {
        this.distances[i].push(
          this.getDistance(this.points[i], this.points[j])
        );
      }
    }
  }

  private getDistance(point1: IPoint, point2: IPoint): number {
    return Math.sqrt(
      Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2)
    );
  }

  private generatePopulation() {
    for (let i = 0; i < this.POPULATION_SIZE; i += 1) {
      this.population.push(this.getVariant());
    }
  }

  private getVariant() {
    const array = Array.from({ length: this.points.length }, (_, i) => i);
    shuffle(array);
    return array;
  }
}
