import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Geometric } from './geometric';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SampleService } from 'src/app/sample/sample';
import { debounceTime, startWith } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-geometric',
  templateUrl: './geometric.component.html',
  styleUrls: ['./geometric.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeometricComponent implements OnInit {

  private geometric!: Geometric;
  formGroup!: FormGroup;
  probabilityControl: FormControl = new FormControl(0.5, [Validators.min(0.0001), Validators.max(1)]);

  @Output() resultsTallied: EventEmitter<Map<number, number>> = new EventEmitter();

  constructor(private sampleService: SampleService) { }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      probability: this.probabilityControl,
    });

    this.geometric = new Geometric(this.probabilityControl.value);

    combineLatest([
      this.sampleService.numbers$,
      this.formGroup.valueChanges.pipe(
        startWith(this.formGroup.value)
      )
    ]).pipe(
      debounceTime(300),
      untilDestroyed(this)
    ).subscribe(([numbers, formValues]) => {
      this.updateDistribution(formValues);
      this.tallyResults(numbers);
    });
  }

  private updateDistribution(formValues: any): void {
    if (formValues.probability !== undefined) {
      this.geometric.setProbability(formValues.probability);
    }
  }

  private tallyResults(inputs: number[]): void {
    const results: [number, number][] = inputs.map(i => [i, this.transform(i)] as [number, number]);
    this.resultsTallied.emit(new Map<number, number>(results));
  }

  private transform(value: number): number {
    return this.geometric.calculateValue(value);
  }
}
