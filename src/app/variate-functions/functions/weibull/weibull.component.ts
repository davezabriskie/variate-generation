import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Weibull } from './weibull';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SampleService } from 'src/app/sample/sample';
import { debounceTime, startWith } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-weibull',
  templateUrl: './weibull.component.html',
  styleUrls: ['./weibull.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeibullComponent implements OnInit {

  private weibull!: Weibull;
  formGroup!: FormGroup;
  shapeControl: FormControl = new FormControl(1, Validators.min(0.001));
  scaleControl: FormControl = new FormControl(1, Validators.min(0.001));

  @Output() resultsTallied: EventEmitter<Map<number, number>> = new EventEmitter();

  constructor(private sampleService: SampleService) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      shape: this.shapeControl,
      scale: this.scaleControl
    });

    this.weibull = new Weibull(this.shapeControl.value, this.scaleControl.value);

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
    if (formValues.shape !== undefined) {
      this.weibull.updateShape(formValues.shape);
    }
    if (formValues.scale !== undefined) {
      this.weibull.updateScale(formValues.scale);
    }
  }

  private tallyResults(inputs: number[]): void {
    const results: [number, number][] = inputs.map(i => [i, this.transform(i)] as [number, number]);
    this.resultsTallied.emit(new Map<number, number>(results));
  }

  private transform(value: number): number {
    return this.weibull.calculateValue(value);
  }
}
