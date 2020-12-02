import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Exponential } from './exponential';
import { Sample } from 'src/app/sample/sample';
import { debounce } from 'rxjs/operators';
import { interval } from 'rxjs';

@Component({
  selector: 'app-exponential',
  templateUrl: './exponential.component.html',
  styleUrls: ['./exponential.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExponentialComponent implements OnInit {

  private exp!: Exponential;
  private readonly sample: Sample = Sample.getInstance();
  lambdaControl: FormControl = new FormControl(1, Validators.min(0.0001));
  formGroup!: FormGroup;

  @Output() resultsTallied: EventEmitter<Map<number, number>> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      lambda: this.lambdaControl
    });
    this.exp = new Exponential(this.lambdaControl.value);
    this.sample.numbers$.subscribe(n => this.tallyResults(n));
    this.lambdaControl.valueChanges.pipe(debounce(() => interval(300))).subscribe((change: number) => {
      this.exp.setLambda(change);
      this.sample.numbers$.subscribe(n => this.tallyResults(n));
    });
  }

  private tallyResults(inputs: number[]): void {
    const results: [number, number][] = inputs.map(i => [i, this.transform(i)] as [number, number]);
    this.resultsTallied.emit(new Map<number, number>(results));
  }

  private transform(value: number): number {
    return this.exp.calculateValue(value);
  }

}
