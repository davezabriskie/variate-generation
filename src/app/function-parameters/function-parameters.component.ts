import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Sample } from '../sample/sample';
import { debounce } from 'rxjs/operators';
import { interval } from 'rxjs';

@Component({
  selector: 'app-function-parameters',
  templateUrl: './function-parameters.component.html',
  styleUrls: ['./function-parameters.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FunctionParametersComponent implements OnInit {

  private sample: Sample = Sample.getInstance();
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
    this.lowerBoundControl.valueChanges.pipe(debounce(() => interval(300)))
      .subscribe(c => this.sample.updateLowerBound(c));
    this.upperBoundControl.valueChanges.pipe(debounce(() => interval(300)))
      .subscribe(c => this.sample.updateUpperBound(c));
  }
}
