import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { Gamma } from './gamma';
import { FormControl, FormGroup } from '@angular/forms';
import { RandomNumbers } from 'src/app/random-number/random-numbers';

@Component({
  selector: 'app-gamma',
  templateUrl: './gamma.component.html',
  styleUrls: ['./gamma.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GammaComponent implements OnInit {

  private gamma!: Gamma;
  private alphaControl: FormControl = new FormControl(1);
  private betaControl: FormControl = new FormControl(1);
  private readonly randomNumbers: RandomNumbers = RandomNumbers.getInstance();
  formGroup!: FormGroup;

  @Output() resultsTallied: EventEmitter<Map<number, number>> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      alpha: this.alphaControl,
      beta: this.betaControl
    });
    this.gamma = new Gamma(this.alphaControl.value, this.betaControl.value);
    this.randomNumbers.numbers$.pipe().subscribe(n => this.tallyResults(n));
    this.alphaControl.valueChanges.subscribe((change: number) => {
      this.gamma.updateShape(change);
      this.randomNumbers.numbers$.pipe().subscribe(n => this.tallyResults(n));
    });
    this.betaControl.valueChanges.subscribe((change: number) => {
      this.gamma.updateRate(change);
      this.randomNumbers.numbers$.pipe().subscribe(n => this.tallyResults(n));
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
