import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Normal } from './normal';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Sample } from 'src/app/sample/sample';
import { debounce } from 'rxjs/operators';
import { interval } from 'rxjs';

@Component({
  selector: 'app-normal',
  templateUrl: './normal.component.html',
  styleUrls: ['./normal.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NormalComponent implements OnInit {

  private normal!: Normal;
  private readonly sample: Sample = Sample.getInstance();
  formGroup!: FormGroup;
  meanControl: FormControl = new FormControl(0);
  standardDeviationControl: FormControl = new FormControl(1, Validators.min(0.001));

  @Output() resultsTallied: EventEmitter<Map<number, number>> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      mean: this.meanControl,
      standardDeviation: this.standardDeviationControl
    });
    this.normal = new Normal(this.standardDeviationControl.value, this.meanControl.value);
    this.sample.numbers$.subscribe(n => this.tallyResults(n));
    this.standardDeviationControl.valueChanges.pipe(debounce(() => interval(300))).subscribe((change: number) => {
      this.normal.setStandardDeviation(change);
      this.sample.numbers$.subscribe(n => this.tallyResults(n));
    });
    this.meanControl.valueChanges.pipe(debounce(() => interval(300))).subscribe((change: number) => {
      this.normal.setMean(change);
      this.sample.numbers$.subscribe(n => this.tallyResults(n));
    });
  }

  private tallyResults(inputs: number[]): void {
    const results: [number, number][] = inputs.map(i => [i, this.transform(i)] as [number, number]);
    this.resultsTallied.emit(new Map<number, number>(results));
  }

  private transform(value: number): number {
    return this.normal.calculateValue(value);
  }

}
