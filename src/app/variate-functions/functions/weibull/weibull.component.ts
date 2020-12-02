import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Weibull } from './weibull';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Sample } from 'src/app/sample/sample';
import { debounce } from 'rxjs/operators';
import { interval } from 'rxjs';

@Component({
  selector: 'app-weibull',
  templateUrl: './weibull.component.html',
  styleUrls: ['./weibull.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeibullComponent implements OnInit {

  private weibull!: Weibull;
  private readonly sample: Sample = Sample.getInstance();
  formGroup!: FormGroup;
  shapeControl: FormControl = new FormControl(1, Validators.min(0.001));
  scaleControl: FormControl = new FormControl(1, Validators.min(0.001));

  @Output() resultsTallied: EventEmitter<Map<number, number>> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      shape: this.shapeControl,
      scale: this.scaleControl
    });
    this.weibull = new Weibull(this.shapeControl.value, this.scaleControl.value);
    this.sample.numbers$.subscribe(n => this.tallyResults(n));
    this.shapeControl.valueChanges.pipe(debounce(() => interval(300))).subscribe((change: number) => {
      this.weibull.updateShape(change);
      this.sample.numbers$.subscribe(n => this.tallyResults(n));
    });
    this.scaleControl.valueChanges.pipe(debounce(() => interval(300))).subscribe((change: number) => {
      this.weibull.updateScale(change);
      this.sample.numbers$.subscribe(n => this.tallyResults(n));
    });
  }

  private tallyResults(inputs: number[]): void {
    const results: [number, number][] = inputs.map(i => [i, this.transform(i)] as [number, number]);
    this.resultsTallied.emit(new Map<number, number>(results));
  }

  private transform(value: number): number {
    return this.weibull.calculateValue(value);
  }

}
