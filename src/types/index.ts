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
  OFF = 'off',
}
