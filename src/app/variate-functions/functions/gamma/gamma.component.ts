import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { Gamma } from './gamma';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SampleService } from 'src/app/sample/sample';
import { debounceTime, startWith } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-gamma',
  templateUrl: './gamma.component.html',
  styleUrls: ['./gamma.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GammaComponent implements OnInit {

  private gamma!: Gamma;
  formGroup!: FormGroup;
  alphaControl: FormControl = new FormControl(1, Validators.min(0.0001));
  betaControl: FormControl = new FormControl(1, Validators.min(0.0001));

  @Output() resultsTallied: EventEmitter<Map<number, number>> = new EventEmitter();

  constructor(private sampleService: SampleService) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      alpha: this.alphaControl,
      beta: this.betaControl
    });

    this.gamma = new Gamma(this.alphaControl.value, this.betaControl.value);

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
    if (formValues.alpha !== undefined) {
      this.gamma.updateShape(formValues.alpha);
    }
    if (formValues.beta !== undefined) {
      this.gamma.updateRate(formValues.beta);
    }
  }

  private tallyResults(inputs: number[]): void {
    const results: [number, number][] = inputs.map(i => [i, this.transform(i)] as [number, number]);
    this.resultsTallied.emit(new Map<number, number>(results));
  }

  private transform(value: number): number {
    return this.gamma.calculateValue(value);
  }
}
