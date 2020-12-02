
export class Weibull {

  private shape: number = 1;
  private scale: number = 2;

  constructor(shape: number, scale: number) {
    this.updateShape(shape);
    this.updateScale(scale);
  }

  updateShape(shape: number): void {
    if (shape > 0) {
      this.shape = shape;
    }
  }

  updateScale(scale: number): void {
    if (scale > 0) {
      this.scale = scale;
    }
  }

  calculateValue(input: number): number {
    if (input > 0) {
      const exp = Math.exp(-1 * Math.pow(input / this.scale, this.shape));
      return (this.shape / this.scale) * Math.pow(input / this.scale, this.shape - 1) * exp;
    }
    return 0;
  }
}
