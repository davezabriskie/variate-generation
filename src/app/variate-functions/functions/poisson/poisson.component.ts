import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Sample } from 'src/app/sample/sample';
import { Poisson } from './poisson';
import { debounce } from 'rxjs/operators';
import { interval } from 'rxjs';

@Component({
  selector: 'app-poisson',
  templateUrl: './poisson.component.html',
  styleUrls: ['./poisson.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PoissonComponent implements OnInit {

  private poisson!: Poisson;
  private readonly sample: Sample = Sample.getInstance();
  formGroup!: FormGroup;
  lambdaControl: FormControl = new FormControl(1, Validators.min(0.0001));

  @Output() resultsTallied: EventEmitter<Map<number, number>> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      lambda: this.lambdaControl
    });
    this.poisson = new Poisson(this.lambdaControl.value);
    this.sample.numbers$.subscribe(n => this.tallyResults(n));
    this.lambdaControl.valueChanges.pipe(debounce(() => interval(300))).subscribe((change: number) => {
      this.poisson.setLambda(change);
      this.sample.numbers$.subscribe(n => this.tallyResults(n));
    });
  }

  private tallyResults(inputs: number[]): void {
    const results: [number, number][] = inputs.map(i => [i, this.transform(i)] as [number, number]);
    this.resultsTallied.emit(new Map<number, number>(results));
  }

  private transform(value: number): number {
    return this.poisson.calculateValue(value);
  }

}
