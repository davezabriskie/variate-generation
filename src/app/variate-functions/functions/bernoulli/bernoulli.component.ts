import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Bernoulli } from './bernoulli';
import { FormControl, FormGroup } from '@angular/forms';
import { RandomNumbers } from 'src/app/random-number/random-numbers';
import { Exponential } from '../exponential/exponential';

@Component({
  selector: 'app-bernoulli',
  templateUrl: './bernoulli.component.html',
  styleUrls: ['./bernoulli.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BernoulliComponent implements OnInit {

  private bernoulli!: Bernoulli;
  private probabilityControl: FormControl = new FormControl(0.5);
  private readonly randomNumbers: RandomNumbers = RandomNumbers.getInstance();
  formGroup!: FormGroup;

  @Output() resultsTallied: EventEmitter<Map<number, number>> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      probability: this.probabilityControl
    });
    this.bernoulli = new Bernoulli(this.probabilityControl.value);
    this.randomNumbers.numbers$.pipe().subscribe(n => this.tallyResults(n));
    this.probabilityControl.valueChanges.subscribe((change: number) => {
      this.bernoulli.updateProbability(change);
      this.randomNumbers.numbers$.pipe().subscribe(n => this.tallyResults(n));
    });
  }

  private tallyResults(inputs: number[]): void {
    const results = new Map<number, number>([[0, 0], [1, 0]]);
    const totalSize = inputs.length;
    inputs.forEach(i => {
      const prob = this.transform(i);
      const result = results.get(prob);
      if (result != null) {
        results.set(prob, result + 1 / totalSize);
      }
    });
    this.resultsTallied.emit(new Map<number, number>(results));
  }

  private transform(value: number): number {
    return this.bernoulli.calculateValue(value);
  }
}
