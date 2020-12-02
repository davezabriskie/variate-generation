import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Exponential } from '../variate-functions/functions/exponential/exponential';

@Component({
  selector: 'app-function-select',
  templateUrl: './function-select.component.html',
  styleUrls: ['./function-select.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FunctionSelectComponent implements OnInit {

  readonly functions = [
    'Bernoulli',
    'Binomial',
    'Exponential',
    'Gamma',
    'Geometric',
    'Normal',
    'Poisson',
    'Weibull'
  ];
  functionFormControl: FormControl = new FormControl(this.functions[0]);
  formGroup!: FormGroup;

  @Output() resultsTallied: EventEmitter<Map<number, number>> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      function: this.functionFormControl
    });
  }

  emitResults(results: Map<number, number>): void {
    this.resultsTallied.emit(results);
  }

}
