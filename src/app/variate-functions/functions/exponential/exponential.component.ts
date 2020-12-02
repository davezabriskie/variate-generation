import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Exponential } from './exponential';
import { RandomNumbers } from 'src/app/random-number/random-numbers';

@Component({
  selector: 'app-exponential',
  templateUrl: './exponential.component.html',
  styleUrls: ['./exponential.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExponentialComponent implements OnInit {

  private exp!: Exponential;
  private lambdaControl: FormControl = new FormControl(1);
  formGroup!: FormGroup;

  @Output() resultsTallied: EventEmitter<Map<number, number>> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      lambda: this.lambdaControl
    });
    this.exp = new Exponential(this.lambdaControl.value);
    this.lambdaControl.valueChanges.subscribe((change: number) =>
      this.exp.setLambda(change)
    );
    RandomNumbers.getInstance().numbers$.pipe().subscribe(n => this.tallyResults(n));
  }

  transform(value: number): number {
    return this.exp.calculateValue(value);
  }

  private tallyResults(inputs: number[]): void {
    const results: [number, number][] = inputs.map(i => [i, this.transform(i)] as [number, number]);
    this.resultsTallied.emit(new Map<number, number>(results));
  }

}
