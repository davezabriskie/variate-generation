import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Binomial } from './binomial';
import { SampleService } from 'src/app/sample/sample';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { debounceTime, startWith } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-binomial',
  templateUrl: './binomial.component.html',
  styleUrls: ['./binomial.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BinomialComponent implements OnInit {

  private binomial!: Binomial;
  formGroup!: FormGroup;
  probabilityControl: FormControl = new FormControl(0.5, [Validators.min(0), Validators.max(1)]);
  sizeControl: FormControl = new FormControl(10, Validators.min(0.0001));

  @Output() resultsTallied: EventEmitter<Map<number, number>> = new EventEmitter();

  constructor(private sampleService: SampleService) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      probability: this.probabilityControl,
      size: this.sizeControl
    });

    this.binomial = new Binomial(this.probabilityControl.value, this.sizeControl.value);

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
      this.binomial.updateProbability(formValues.probability);
    }
    if (formValues.size !== undefined) {
      this.binomial.updateSize(formValues.size);
    }
  }

  private tallyResults(inputs: number[]): void {
    const results: [number, number][] = inputs.map(i => [i, this.transform(i)] as [number, number]);
    this.resultsTallied.emit(new Map<number, number>(results));
  }

  private transform(value: number): number {
    return this.binomial.calculateValue(value);
  }

}
