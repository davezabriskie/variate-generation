
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

  // credit to stack overflow
  // https://stackoverflow.com/a/32532131
  private factorialize(value: number): number {
    if (value % 1 !== 0 || value < 0){
      return this.gamma(value + 1);
    }
    else {
        if (value === 0) {
          return 1;
        }
        for (let i = value; --i; ) {
          value *= i;
        }
        return value;
    }
  }

  private gamma(n: number): number {
    const g = 7;
    const p = [0.99999999999980993,
      676.5203681218851,
      -1259.1392167224028,
      771.32342877765313,
      -176.61502916214059,
      12.507343278686905,
      -0.13857109526572012,
      9.9843695780195716e-6,
      1.5056327351493116e-7];
    if (n < 0.5) {
      return Math.PI / Math.sin(n * Math.PI) / this.gamma(1 - n);
    }
    else {
      n--;
      let x = p[0];
      for (let i = 1; i < g + 2; i++) {
        x += p[i] / (n + i);
      }
      const t = n + g + 0.5;
      return Math.sqrt(2 * Math.PI) * Math.pow(t, (n + 0.5)) * Math.exp(-t) * x;
    }
  }
}
