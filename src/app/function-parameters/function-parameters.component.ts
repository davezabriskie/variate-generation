import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SampleService } from '../sample/sample';
import { debounceTime } from 'rxjs/operators';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-function-parameters',
  templateUrl: './function-parameters.component.html',
  styleUrls: ['./function-parameters.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FunctionParametersComponent implements OnInit {

  private lowerBoundControl: FormControl = new FormControl(0);
  private upperBoundControl: FormControl = new FormControl(10);
  formGroup!: FormGroup;

  constructor(private sampleService: SampleService) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      lower: this.lowerBoundControl,
      upper: this.upperBoundControl
    });

    this.setUpControlListeners();
  }

  private setUpControlListeners(): void {
    this.lowerBoundControl.valueChanges.pipe(
      debounceTime(300),
      untilDestroyed(this)
    ).subscribe(value => this.sampleService.updateLowerBound(value));

    this.upperBoundControl.valueChanges.pipe(
      debounceTime(300),
      untilDestroyed(this)
    ).subscribe(value => this.sampleService.updateUpperBound(value));
  }
}
