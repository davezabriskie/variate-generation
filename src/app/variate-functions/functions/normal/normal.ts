export class Normal {

  private standardDeviation: number = 1;
  private mean: number = 0;

  constructor(standardDeviation: number, mean: number) {
    this.standardDeviation = standardDeviation;
    this.mean = mean;
  }

  setStandardDeviation(standardDeviation: number): void {
    if (standardDeviation !== 0) {
      this.standardDeviation = standardDeviation;
    }
  }

  setMean(mean: number): void {
    this.mean = mean;
  }

  calculateValue(input: number): number {
    const invertTauRoot = 1 / (Math.sqrt(2 * Math.PI));
    const exponent = -0.5 * Math.pow((input - this.mean) / this.standardDeviation, 2);
    return invertTauRoot * (1 / this.standardDeviation) * Math.exp(exponent);
  }

}