import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Exponential } from './exponential';
import { SampleService } from 'src/app/sample/sample';
import { debounceTime, startWith } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-exponential',
  templateUrl: './exponential.component.html',
  styleUrls: ['./exponential.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExponentialComponent implements OnInit {

  private exp!: Exponential;
  lambdaControl: FormControl = new FormControl(1, Validators.min(0.0001));
  formGroup!: FormGroup;

  @Output() resultsTallied: EventEmitter<Map<number, number>> = new EventEmitter();

  constructor(private sampleService: SampleService) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      lambda: this.lambdaControl
    });

    this.exp = new Exponential(this.lambdaControl.value);

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
    if (formValues.lambda !== undefined) {
      this.exp.setLambda(formValues.lambda);
    }
  }

  private tallyResults(inputs: number[]): void {
    const results: [number, number][] = inputs.map(i => [i, this.transform(i)] as [number, number]);
    this.resultsTallied.emit(new Map<number, number>(results));
  }

  private transform(value: number): number {
    return this.exp.calculateValue(value);
  }

}
