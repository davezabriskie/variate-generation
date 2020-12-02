
export class Bernoulli {

  private probability = 0.5;

  constructor(probability: number) {
    this.updateProbability(probability);
  }

  updateProbability(probability: number): void {
    if (probability > 0 && probability < 1) {
      this.probability = probability;
    }
  }

  calculateValue(input: number): number {
    return Math.random() >= this.probability ? 0 : 1;
  }
}
