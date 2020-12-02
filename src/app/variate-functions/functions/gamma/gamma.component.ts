import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { Gamma } from './gamma';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Sample } from 'src/app/sample/sample';
import { debounce } from 'rxjs/operators';
import { interval } from 'rxjs';

@Component({
  selector: 'app-gamma',
  templateUrl: './gamma.component.html',
  styleUrls: ['./gamma.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GammaComponent implements OnInit {

  private gamma!: Gamma;
  private readonly sample: Sample = Sample.getInstance();
  formGroup!: FormGroup;
  alphaControl: FormControl = new FormControl(1, Validators.min(0.0001));
  betaControl: FormControl = new FormControl(1, Validators.min(0.0001));

  @Output() resultsTallied: EventEmitter<Map<number, number>> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      alpha: this.alphaControl,
      beta: this.betaControl
    });
    this.gamma = new Gamma(this.alphaControl.value, this.betaControl.value);
    this.sample.numbers$.subscribe(n => this.tallyResults(n));
    this.alphaControl.valueChanges.pipe(debounce(() => interval(300))).subscribe((change: number) => {
      this.gamma.updateShape(change);
      this.sample.numbers$.subscribe(n => this.tallyResults(n));
    });
    this.betaControl.valueChanges.pipe(debounce(() => interval(300))).subscribe((change: number) => {
      this.gamma.updateRate(change);
      this.sample.numbers$.subscribe(n => this.tallyResults(n));
    });
  }

  private tallyResults(inputs: number[]): void {
    const results: [number, number][] = inputs.map(i => [i, this.transform(i)] as [number, number]);
    this.resultsTallied.emit(new Map<number, number>(results));
  }

  private transform(value: number): number {
    return this.gamma.calculateValue(value);
  }

}
