
export class Geometric {

  private probability = 0.5;

  constructor(probability: number) {
    this.setProbability(probability);
  }

  setProbability(probability: number): void {
    if (probability > 0 && probability < 1) {
      this.probability = probability;
    }
  }

  calculateValue(input: number): number {
    if (input > 0) {
      return this.probability * Math.pow((1 - this.probability), input);
    }
    return 0;
  }
}
