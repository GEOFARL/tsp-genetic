export interface IPoint {
  x: number;
  y: number;
}

export enum Crossover {
  HEURISTIC = 'heuristic',
  OFF = 'off',
}

export enum Mutation {
  SWAP = 'swap',
  OFF = 'off',
}

export enum LocalImprovement {
  TWO_OPT = 'two_opt',
  THREE_OPT = 'three_opt',
  OFF = 'off',
}

export interface GAConfig {
  populationSize: number;
  crossoverProbability: number;
  mutationProbability: number;
  localImprovementProbability: number;
  crossover: Crossover;
  mutation: Mutation;
  localImprovement: LocalImprovement;
}
