import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import {
  FormGroup,
} from '@angular/forms';
import { Sample } from 'src/app/sample/sample';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GraphComponent {

  private sample: Sample = Sample.getInstance();
  formGroup!: FormGroup;

  values: number[] = [];
  mapValues: Map<number, number> = new Map();
  graphSeries: any = [{
    name: 'plot',
    series: []
  }];

  constructor(private changeDetectorRef: ChangeDetectorRef) {
    this.sample.numbers$.subscribe(n => {
      this.values = n;
      this.changeDetectorRef.markForCheck();
    });
  }

  setResults(results: Map<number, number>): void {
    this.mapValues = results;
    const updatedSeries: any[] = [];
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
