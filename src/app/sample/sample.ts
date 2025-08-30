import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SampleService {

  private sampleSize = 250;
  private lowerBound = 0;
  private upperBound = 10;
  private delta = 10;
  numbers$: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);

  constructor() {
    this.buildNumbers();
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
