import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Bernoulli } from './bernoulli';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SampleService } from 'src/app/sample/sample';
import { debounceTime, startWith } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-bernoulli',
  templateUrl: './bernoulli.component.html',
  styleUrls: ['./bernoulli.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BernoulliComponent implements OnInit {

  private bernoulli!: Bernoulli;
  probabilityControl: FormControl = new FormControl(0.5, [Validators.min(0), Validators.max(1)]);
  formGroup!: FormGroup;

  @Output() resultsTallied: EventEmitter<Map<number, number>> = new EventEmitter();

  constructor(private sampleService: SampleService) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      probability: this.probabilityControl
    });

    this.bernoulli = new Bernoulli(this.probabilityControl.value);

    combineLatest([
      this.sampleService.numbers$,
      this.formGroup.valueChanges.pipe(
        startWith(this.formGroup.value)
      )
    ]).pipe(
      debounceTime(300),
      untilDestroyed(this)
    ).subscribe(([numbers, formValues]) => {
      this.updateDistribution(formValues);
      this.tallyResults(numbers);
    });
  }

  private updateDistribution(formValues: any): void {
    if (formValues.probability !== undefined) {
      this.bernoulli.updateProbability(formValues.probability);
    }
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
