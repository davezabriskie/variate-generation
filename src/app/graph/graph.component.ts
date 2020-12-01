import { Component, ChangeDetectionStrategy, OnInit, ChangeDetectorRef } from '@angular/core';
import { Exponential } from '../variate-functions/functions/exponential/exponential';
import {
  FormGroup, FormControl,
} from '@angular/forms';
import { RandomNumbers } from 'src/app/random-number/random-numbers';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GraphComponent implements OnInit {

  private exp: Exponential;
  private randomNumbers: RandomNumbers = RandomNumbers.getInstance();
  private lambdaControl: FormControl = new FormControl(1);
  formGroup: FormGroup;

  values: number[] = [];

    // todos
    // break out form into function specific
    // add header buttons for exporting to tsv (value, prob)
    // X: add scaling for random numbers
    // add more functions (bern, gamma, weibull)
    // readme


    // nice to have todos
    // add graphing
    // maybe add state for flow?

  constructor(private changeDetectorRef: ChangeDetectorRef) {
    this.formGroup = new FormGroup({
      lambda: this.lambdaControl
    });
    this.exp = new Exponential(this.lambdaControl.value);
    this.randomNumbers.numbers$.pipe().subscribe(n => {
      this.values = n;
      this.changeDetectorRef.markForCheck();
    });
  }

  ngOnInit(): void {
    this.lambdaControl.valueChanges.subscribe((change: number) =>
      this.exp.setLambda(change)
    );
  }

  transform(value: number): number {
    return this.exp.calculateValue(value);
  }

}
