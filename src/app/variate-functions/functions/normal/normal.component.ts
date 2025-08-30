import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Normal } from './normal';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SampleService } from 'src/app/sample/sample';
import { debounceTime, startWith } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-normal',
  templateUrl: './normal.component.html',
  styleUrls: ['./normal.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NormalComponent implements OnInit {

  private normal!: Normal;
  formGroup!: FormGroup;
  meanControl: FormControl = new FormControl(0);
  standardDeviationControl: FormControl = new FormControl(1, Validators.min(0.001));

  @Output() resultsTallied: EventEmitter<Map<number, number>> = new EventEmitter();

  constructor(private sampleService: SampleService) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      mean: this.meanControl,
      standardDeviation: this.standardDeviationControl
    });

    this.normal = new Normal(this.standardDeviationControl.value, this.meanControl.value);

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
    if (formValues.mean !== undefined) {
      this.normal.setMean(formValues.mean);
    }
    if (formValues.standardDeviation !== undefined) {
      this.normal.setStandardDeviation(formValues.standardDeviation);
    }
  }

  private tallyResults(inputs: number[]): void {
    const results: [number, number][] = inputs.map(i => [i, this.transform(i)] as [number, number]);
    this.resultsTallied.emit(new Map<number, number>(results));
  }

  private transform(value: number): number {
    return this.normal.calculateValue(value);
  }

}
