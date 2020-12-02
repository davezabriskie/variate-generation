import { factorial } from '../factorial';

export class Binomial {

  private probability = 0.5;
  private size = 1;

  constructor(probability: number, size: number) {
    this.updateSize(size);
    this.updateProbability(probability);
  }

  updateProbability(probability: number): void {
    if (probability >= 0 && probability <= 1) {
      this.probability = probability;
    }
  }

  updateSize(size: number): void {
    if (size > 0) {
      this.size = size;
    }
  }

  calculateValue(input: number): number {
    if (input > 0) {
      const choose = factorial(this.size) / (factorial(input) * factorial(this.size - input));
      const m = choose * Math.pow(this.probability, input) * Math.pow(1 - this.probability, this.size - input);
      if (m < 0) {
        console.log(m)
      }
      return m;
    }
    return 0;
  }

}
