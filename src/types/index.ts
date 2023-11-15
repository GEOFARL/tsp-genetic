export interface IPoint {
  x: number;
  y: number;
}

export enum Crossover {
  HEURISTIC = 'heuristic',
  PARTIALLY_MAPPED = 'partially_mapped',
  ORDERED = 'ordered',
  OFF = 'off',
}

export enum Mutation {
  SWAP = 'swap',
  DISPLACEMENT = 'displacement',
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
