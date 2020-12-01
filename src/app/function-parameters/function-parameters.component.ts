import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RandomNumbers } from '../random-number/random-numbers';

@Component({
  selector: 'app-function-parameters',
  templateUrl: './function-parameters.component.html',
  styleUrls: ['./function-parameters.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FunctionParametersComponent implements OnInit {

  private randomNumbers: RandomNumbers = RandomNumbers.getInstance();
  private lowerBoundControl: FormControl = new FormControl(0);
  private upperBoundControl: FormControl = new FormControl(10);
  formGroup!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      lower: this.lowerBoundControl,
      upper: this.upperBoundControl
    });

    this.setUpControlListeners();
  }

  private setUpControlListeners(): void {
    this.lowerBoundControl.valueChanges.subscribe(c => this.randomNumbers.updateLowerBound(c));
    this.upperBoundControl.valueChanges.subscribe(c => this.randomNumbers.updateUpperBound(c));
  }
}
