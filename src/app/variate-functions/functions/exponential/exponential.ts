
export class Exponential {

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
      return this.lambda * Math.exp(-this.lambda * input);
    }
    return 0;
  }
}
