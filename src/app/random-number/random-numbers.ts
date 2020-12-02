import { BehaviorSubject } from 'rxjs';

export class RandomNumbers {
  private static instance: RandomNumbers;
  private backingRandomNumbers: number[] = [];
  private sampleSize: number = 150;
  private lowerBound: number = 0;
  private upperBound: number = 10;
  private delta: number = 10;
  numbers$: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);

  private constructor() {
    this.buildBackingRandomNumbers();
    this.buildNumbers();
  }

  static getInstance(): RandomNumbers {
    if (!RandomNumbers.instance) {
      RandomNumbers.instance = new RandomNumbers();
    }

    return RandomNumbers.instance;
  }

  generateNewArray(size: number): void {
    this.sampleSize = size;
    if (size > 0) {
      this.buildBackingRandomNumbers();
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

  private buildBackingRandomNumbers(): void {
    this.backingRandomNumbers = [];
    [...Array(this.sampleSize).keys()].forEach((l) => {
      this.backingRandomNumbers.push(Math.random());
    });
  }

  private buildNumbers(): void {
    const numbers: number[] = [];
    [...Array(this.sampleSize).keys()].forEach((l, index) => {
      numbers.push(this.lowerBound + this.backingRandomNumbers[index] * (this.delta));
    });
    this.numbers$.next(numbers.sort());
  }
}
