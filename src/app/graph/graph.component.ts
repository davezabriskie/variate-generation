import { Component, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import {
  FormGroup,
} from '@angular/forms';
import { SampleService } from 'src/app/sample/sample';
import { GraphSeries, GraphDataPoint } from '../shared/interfaces';
import { saveAs } from 'file-saver';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GraphComponent implements OnInit {

  formGroup!: FormGroup;

  values: number[] = [];
  mapValues: Map<number, number> = new Map();
  graphSeries: GraphSeries[] = [{
    name: 'plot',
    series: []
  }];

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private sampleService: SampleService
  ) {}

  ngOnInit(): void {
    this.sampleService.numbers$.pipe(
      untilDestroyed(this)
    ).subscribe(numbers => {
      this.values = numbers;
      this.changeDetectorRef.markForCheck();
    });
  }

  setResults(results: Map<number, number>): void {
    this.mapValues = results;
    const updatedSeries: GraphDataPoint[] = [];
    this.mapValues.forEach((value, key) => updatedSeries.push({
      name: key,
      value
    }));
    this.graphSeries[0].series = updatedSeries;
    this.graphSeries = [...this.graphSeries];
  }

  saveFile(): void {
    const results: string[] = [];
    this.mapValues.forEach(((value, key) => results.push(`${key}\t${value}\n`)));
    const blob = new Blob(results, {type: 'text/plain;charset=utf-8'});
    saveAs(blob, 'export.tsv');
  }

}
