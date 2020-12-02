import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Geometric } from './geometric';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RandomNumbers } from 'src/app/random-number/random-numbers';

@Component({
  selector: 'app-geometric',
  templateUrl: './geometric.component.html',
  styleUrls: ['./geometric.component.less']
})
export class GeometricComponent implements OnInit {

  private geometric!: Geometric;
  private readonly randomNumbers: RandomNumbers = RandomNumbers.getInstance();
  formGroup!: FormGroup;
  probabilityControl: FormControl = new FormControl(0.5, [Validators.min(0.0001), Validators.max(1)]);

  @Output() resultsTallied: EventEmitter<Map<number, number>> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      probability: this.probabilityControl,
    });
    this.geometric = new Geometric(this.probabilityControl.value);
    this.randomNumbers.numbers$.subscribe(n => this.tallyResults(n));
    this.probabilityControl.valueChanges.subscribe((change: number) => {
      this.geometric.setProbability(change);
      this.randomNumbers.numbers$.subscribe(n => this.tallyResults(n));
    });
  }

  private tallyResults(inputs: number[]): void {
    const results: [number, number][] = inputs.map(i => [i, this.transform(i)] as [number, number]);
    this.resultsTallied.emit(new Map<number, number>(results));
  }

  private transform(value: number): number {
    return this.geometric.calculateValue(value);
  }
}
