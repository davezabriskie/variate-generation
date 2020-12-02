import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Weibull } from './weibull';
import { FormControl, FormGroup } from '@angular/forms';
import { RandomNumbers } from 'src/app/random-number/random-numbers';
import { Gamma } from '../gamma/gamma';

@Component({
  selector: 'app-weibull',
  templateUrl: './weibull.component.html',
  styleUrls: ['./weibull.component.less']
})
export class WeibullComponent implements OnInit {

  private weibull!: Weibull;
  private shapeControl: FormControl = new FormControl(1);
  private scaleControl: FormControl = new FormControl(1);
  private readonly randomNumbers: RandomNumbers = RandomNumbers.getInstance();
  formGroup!: FormGroup;

  @Output() resultsTallied: EventEmitter<Map<number, number>> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      shape: this.shapeControl,
      scale: this.scaleControl
    });
    this.weibull = new Weibull(this.shapeControl.value, this.scaleControl.value);
    this.randomNumbers.numbers$.pipe().subscribe(n => this.tallyResults(n));
    this.shapeControl.valueChanges.subscribe((change: number) => {
      this.weibull.updateShape(change);
      this.randomNumbers.numbers$.pipe().subscribe(n => this.tallyResults(n));
    });
    this.scaleControl.valueChanges.subscribe((change: number) => {
      this.weibull.updateScale(change);
      this.randomNumbers.numbers$.pipe().subscribe(n => this.tallyResults(n));
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