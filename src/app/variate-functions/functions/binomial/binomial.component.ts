import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Binomial } from './binomial';
import { Sample } from 'src/app/sample/sample';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { debounce } from 'rxjs/operators';
import { interval } from 'rxjs';

@Component({
  selector: 'app-binomial',
  templateUrl: './binomial.component.html',
  styleUrls: ['./binomial.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BinomialComponent implements OnInit {

  private binomial!: Binomial;
  private readonly sample: Sample = Sample.getInstance();
  formGroup!: FormGroup;
  probabilityControl: FormControl = new FormControl(0.5, [Validators.min(0), Validators.max(1)]);
  sizeControl: FormControl = new FormControl(10, Validators.min(0.0001));

  @Output() resultsTallied: EventEmitter<Map<number, number>> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      probability: this.probabilityControl,
      size: this.sizeControl
    });
    this.binomial = new Binomial(this.probabilityControl.value, this.sizeControl.value);
    this.sample.numbers$.pipe(debounce(() => interval(300))).subscribe(n => this.tallyResults(n));
    this.probabilityControl.valueChanges.subscribe((change: number) => {
      this.binomial.updateProbability(change);
      this.sample.numbers$.subscribe(n => this.tallyResults(n));
    });
    this.sizeControl.valueChanges.pipe(debounce(() => interval(300))).subscribe((change: number) => {
      this.binomial.updateSize(change);
      this.sample.numbers$.subscribe(n => this.tallyResults(n));
    });
  }

  private tallyResults(inputs: number[]): void {
    const results: [number, number][] = inputs.map(i => [i, this.transform(i)] as [number, number]);
    this.resultsTallied.emit(new Map<number, number>(results));
  }

  private transform(value: number): number {
    return this.binomial.calculateValue(value);
  }

}
