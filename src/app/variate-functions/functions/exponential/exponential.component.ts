import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Exponential } from './exponential';

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

  constructor() { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      lambda: this.lambdaControl
    });
    this.exp = new Exponential(this.lambdaControl.value);
    this.lambdaControl.valueChanges.subscribe((change: number) =>
      this.exp.setLambda(change)
    );
  }

  transform(value: number): number {
    return this.exp.calculateValue(value);
  }

}
