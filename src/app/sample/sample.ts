import { BehaviorSubject } from 'rxjs';

export class Sample {

  private static instance: Sample;
  private sampleSize: number = 250;
  private lowerBound: number = 0;
  private upperBound: number = 10;
  private delta: number = 10;
  numbers$: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);

  private constructor() {
    this.buildNumbers();
  }

  static getInstance(): Sample {
    if (!Sample.instance) {
      Sample.instance = new Sample();
    }

    return Sample.instance;
  }

  generateNewArray(size: number): void {
    this.sampleSize = size;
    if (size > 0) {
      this.buildNumbers();
    }
  }

  updateLowerBound(lowerBound: number): void {
    this.lowerBound = lowerBound;
    if (this.upperBound > this.lowerBound) {
      this.delta = this.upperBound - this.lowerBound;
      this.buildNumbers();
    }
  }

  updateUpperBound(upperBound: number): void {
    this.upperBound = upperBound;
    if (this.lowerBound < this.upperBound) {
      this.delta = this.upperBound - this.lowerBound;
      this.buildNumbers();
    }
  }

  private buildNumbers(): void {
    const numbers: number[] = [];
    [...Array(this.sampleSize).keys()].forEach((l, index) => {
      numbers.push(this.lowerBound + (1 + index) * (this.delta / this.sampleSize));
    });
    this.numbers$.next(numbers.sort());
  }
}
