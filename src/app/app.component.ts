import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { RandomNumbers } from './random-number/random-numbers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
}
