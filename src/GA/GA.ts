import {
  Crossover,
  GAConfig,
  IPoint,
  LocalImprovement,
  Mutation,
} from '../types';
import { getRandomNumber, shuffle, swap } from '../utils';

export default class GA {
  private points: IPoint[];
  private distances: number[][] = [];
  private population: number[][] = [];
  private populationEvaluation: number[];
  private roulette: number[] = [];
  private bestPopulation: { value: number; population: number[] } | null = null;

  private readonly CROSSOVER_TYPE: Crossover;
  private readonly MUTATION_TYPE: Mutation;
  private readonly LOCAL_IMPROVEMENT_TYPE: LocalImprovement;

  private readonly CROSSOVER_PROBABILITY: number;
  private readonly MUTATION_PROBABILITY: number;
  private readonly POPULATION_SIZE: number;

  private generationCount = 0;
  private mutationCount = 0;

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

    this.populationEvaluation = new Array(this.POPULATION_SIZE);
    this.roulette = new Array(this.POPULATION_SIZE);

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

    this.findBestPopulation();
  }

  private selection() {
    const newPopulation = [];

    newPopulation.push(this.bestPopulation!.population);
    this.loadRoulette();

    for (let i = 1; i < this.POPULATION_SIZE; i += 1) {
      const rouletteResult = this.rollRoulette(Math.random());
      newPopulation.push(this.population[rouletteResult]);
    }

    this.population = newPopulation;
  }

  private crossover() {
    if (this.CROSSOVER_TYPE === Crossover.OFF) return;

    switch (this.CROSSOVER_TYPE) {
      case Crossover.HEURISTIC: {
        const array = [];
        for (let i = 0; i < this.POPULATION_SIZE; i += 1) {
          if (Math.random() < this.CROSSOVER_PROBABILITY) {
            array.push(i);
          }
        }

        shuffle(array);
        for (let i = 0; i < array.length - 2; i += 2) {
          this.heuristicCrossover(array[i], array[i + 1]);
        }
        break;
      }
    }
  }

  private heuristicCrossover(
    firstChromosomeIdx: number,
    secondChromosomeIdx: number
  ) {
    const firstChild = this.getChild(
      'next',
      firstChromosomeIdx,
      secondChromosomeIdx
    );
    const secondChild = this.getChild(
      'previous',
      firstChromosomeIdx,
      secondChromosomeIdx
    );

    this.population[firstChromosomeIdx] = firstChild;
    this.population[secondChromosomeIdx] = secondChild;
  }

  private getChild(
    method: 'next' | 'previous',
    firstChromosomeIdx: number,
    secondChromosomeIdx: number
  ): number[] {
    const solution = [];

    const firstChromosome = this.population[firstChromosomeIdx].slice();
    const secondChromosome = this.population[secondChromosomeIdx].slice();

    let randomPoint =
      firstChromosome[getRandomNumber(0, firstChromosome.length - 1)];
    solution.push(randomPoint);

    let firstPoint, secondPoint;

    while (firstChromosome.length > 1) {
      if (method === 'next') {
        firstPoint = firstChromosome['next'](
          firstChromosome.indexOf(randomPoint)
        );
        secondPoint = secondChromosome['next'](
          secondChromosome.indexOf(randomPoint)
        );
      } else {
        firstPoint = firstChromosome['previous'](
          firstChromosome.indexOf(randomPoint)
        );
        secondPoint = secondChromosome['previous'](
          secondChromosome.indexOf(randomPoint)
        );
      }

      firstChromosome.deleteByValue(randomPoint);
      secondChromosome.deleteByValue(randomPoint);

      randomPoint =
        this.distances[randomPoint][firstPoint] <
        this.distances[randomPoint][secondPoint]
          ? firstPoint
          : secondPoint;
      solution.push(randomPoint);
    }

    return solution;
  }

  private mutation() {
    if (this.MUTATION_TYPE === Mutation.OFF) return;

    for (let i = 0; i < this.POPULATION_SIZE; i += 1) {
      if (Math.random() < this.MUTATION_PROBABILITY) {
        switch (this.MUTATION_TYPE) {
          case Mutation.SWAP: {
            this.population[i] = this.swapMutate(this.population[i]);
            break;
          }
        }
      }
    }
  }

  private swapMutate(chromosome: number[]): number[] {
    this.mutationCount += 1;

    let m;
    let n;
    do {
      m = getRandomNumber(0, chromosome.length - 3);
      n = getRandomNumber(0, chromosome.length - 1);
    } while (m >= n);

    const j = Math.floor((n - m + 1) / 2);
    for (let i = 0; i < j; i += 1) {
      const result = swap(m + i, n - i, chromosome);
      if (result) chromosome = result;
    }

    return chromosome;
  }

  private localImprovement() {
    if (this.LOCAL_IMPROVEMENT_TYPE === LocalImprovement.OFF) return;
  }

  private computeDistances() {
    this.distances = new Array(this.points.length);
    for (let i = 0; i < this.points.length; i += 1) {
      this.distances[i] = new Array<number>(this.points.length);
      for (let j = 0; j < this.points.length; j += 1) {
        this.distances[i][j] = this.getDistance(this.points[i], this.points[j]);
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
      this.populationEvaluation[i] = this.evaluate(this.population[i]);
    }

    const currentBestPopulation = this.getBestPopulation();

    if (
      this.bestPopulation === null ||
      this.bestPopulation.value > currentBestPopulation.bestValue
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
        randomNumber >= this.roulette[i - 1] &&
        randomNumber <= this.roulette[i]
      ) {
        return i;
      }
    }

    return -1;
  }
}
