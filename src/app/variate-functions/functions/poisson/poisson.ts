import { factorial } from '../factorial';

export class Poisson {

  private lambda: number;

  constructor(lambda: number) {
    this.lambda = lambda;
  }

  setLambda(lambda: number): void {
    if (lambda > 0) {
      this.lambda = lambda;
    }
  }

  calculateValue(input: number): number {
    if (input > 0) {
      return Math.pow(this.lambda, input) * Math.exp(-this.lambda) / factorial(input);
    }
    return 0;
  }
}
