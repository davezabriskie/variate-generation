
export class Gamma {

  private shape = 0.5; // alpha
  private rate = 1; // beta

  constructor(shape: number, rate: number) {
    this.updateRate(rate);
    this.updateShape(shape);
  }

  updateShape(shape: number): void {
    if (shape > 0) {
      this.shape = shape;
    }
  }

  updateRate(rate: number): void {
    if (rate > 0) {
      this.rate = rate;
    }
  }

  calculateValue(input: number): number {
    if (input > 0) {
      const gamma = this.factorialize(this.shape - 1);
      return (Math.pow(this.rate, this.shape) * Math.pow(input, this.shape - 1) * Math.exp(-this.rate * input)) / gamma;
    }
    return 0;
  }

  private factorialize(value: number): number {
    if (value < 0) {
      return -1;
    } else if (value === 0) {
      return 1;
    }
    return (value * this.factorialize(value - 1));
  }
}
