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
  private populationEvaluation: number[] = [];
  private roulette: number[] = [];
  private bestPopulation: { value: number; population: number[] } | null = null;

  private readonly CROSSOVER_TYPE: Crossover;
  private readonly MUTATION_TYPE: Mutation;
  private readonly LOCAL_IMPROVEMENT_TYPE: LocalImprovement;

  private readonly CROSSOVER_PROBABILITY: number;
  private readonly MUTATION_PROBABILITY: number;
  private readonly POPULATION_SIZE: number;

  private generationCount = 0;

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
    this.findBestPopulation();
  }

  public getRoute(): number[] {
    this.getNextGeneration();
    return this.bestPopulation!.population!;
  }

  private getNextGeneration() {
    this.generationCount += 1;

    this.selection();
    this.crossover();
    this.mutation();
    this.localImprovement();

    // this.findBestPopulation();
  }

  private selection() {
    const newPopulation = [];

    newPopulation.push(this.bestPopulation!.population);
    this.loadRoulette();

    for (let i = 1; i < this.POPULATION_SIZE; i += 1) {
      newPopulation.push(this.population[this.rollRoulette(Math.random())]);
    }

    this.population = newPopulation;
  }

  private crossover() {}

  private mutation() {}

  private localImprovement() {}

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

  private findBestPopulation() {
    for (let i = 0; i < this.population.length; i += 1) {
      this.populationEvaluation.push(this.evaluate(this.population[i]));
    }

    const currentBestPopulation = this.getBestPopulation();

    if (
      this.bestPopulation === null ||
      this.bestPopulation.value < currentBestPopulation.bestValue
    ) {
      this.bestPopulation = {
        population: this.population[currentBestPopulation.index].slice(),
        value: currentBestPopulation.bestValue,
      };
    }
  }

  private evaluate(variant: number[]) {
    let sum = this.distances[variant[0]][variant[variant.length - 1]];

    for (let i = 1; i < variant.length; i += 1) {
      sum += this.distances[variant[i]][variant[i - 1]];
    }

    return sum;
  }

  private getBestPopulation() {
    let index = 0;
    let bestValue = this.populationEvaluation[0];

    for (let i = 1; i < this.population.length; i += 1) {
      if (bestValue > this.populationEvaluation[i]) {
        bestValue = this.populationEvaluation[i];
        index = i;
      }
    }

    return {
      index,
      bestValue,
    };
  }

  private loadRoulette() {
    const fitnessValues = this.populationEvaluation.map(
      (evaluation) => 1 / evaluation
    );

    const sum = fitnessValues.reduce((prev, acc) => acc + prev, 0);

    this.roulette = fitnessValues.map((value) => value / sum);

    for (let i = 1; i < this.roulette.length; i += 1) {
      this.roulette[i] += this.roulette[i - 1];
    }
  }

  private rollRoulette(randomNumber: number) {
    if (randomNumber < this.roulette[0]) {
      return 0;
    }

    for (let i = 1; i < this.roulette.length; i += 1) {
      if (
        randomNumber > this.roulette[i - 1] &&
        randomNumber < this.roulette[i]
      ) {
        return i;
      }
    }

    return -1;
  }
}
