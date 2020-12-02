import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Bernoulli } from './bernoulli';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Sample } from 'src/app/sample/sample';
import { debounce } from 'rxjs/operators';
import { interval } from 'rxjs';

@Component({
  selector: 'app-bernoulli',
  templateUrl: './bernoulli.component.html',
  styleUrls: ['./bernoulli.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BernoulliComponent implements OnInit {

  private bernoulli!: Bernoulli;
  private readonly sample: Sample = Sample.getInstance();
  probabilityControl: FormControl = new FormControl(0.5, [Validators.min(0), Validators.max(1)]);
  formGroup!: FormGroup;

  @Output() resultsTallied: EventEmitter<Map<number, number>> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      probability: this.probabilityControl
    });
    this.bernoulli = new Bernoulli(this.probabilityControl.value);
    this.sample.numbers$.subscribe(n => this.tallyResults(n));
    this.probabilityControl.valueChanges.pipe(debounce(() => interval(300))).subscribe((change: number) => {
      this.bernoulli.updateProbability(change);
      this.sample.numbers$.subscribe(n => this.tallyResults(n));
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
