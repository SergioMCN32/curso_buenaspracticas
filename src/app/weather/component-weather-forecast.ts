import { Component, OnInit, Input } from '@angular/core';
import { Forecast } from './forecast';

@Component({
  selector: 'app-weather-forecast',
  template: `
  <mat-divider></mat-divider>
<div class="forecast-title">Previsión</div>
<mat-divider></mat-divider>
<mat-grid-list cols="5" rowHeight="40px" class="forecast-list" *ngFor="let forecast of forecasts">
  <mat-grid-tile colspan="2" class="forecast-date">
    {{forecast?.date | date:'fullDate'}}
  </mat-grid-tile>
  <mat-grid-tile class="forecast-icon">
    <app-weather-icon [weatherInfo]="forecast?.info"></app-weather-icon>
  </mat-grid-tile>
  <mat-grid-tile class="forecast-temp-up">
    <i class="wi wi-direction-up"></i> {{forecast?.maxTemperature | celsius}}
  </mat-grid-tile>
  <mat-grid-tile class="forecast-temp-down">
    <i class="wi wi-direction-down"></i> {{forecast?.minTemperature | celsius}}
  </mat-grid-tile>
</mat-grid-list>
  `,
  styles: [
    `
    .forecast-title{
      font-size:22px;
      background-color: #e0e0e0 !important;
      padding: 8px;
  }

  .forecast-list {
      border-bottom: 1px solid #e0e0e0;
  }
  .forecast-date{
      font-size:14px;
  }
  .forecast-icon {
      font-size: 24px;
  }
  .forecast-temp-up {
      font-size:18px;
  }

  .forecast-temp-up .wi{
      font-size: 24px;
      margin-right: 4px;
      color:#D32F2F;
  }

  .forecast-temp-down {
      font-size:18px;
  }

  .forecast-temp-down .wi{
      font-size: 24px;
      margin-right: 4px;
      color:#1E88E5;
  }
    `
  ]
})
export class WeatherForecastComponent implements OnInit {

  @Input() forecasts: Array<Forecast>;

  constructor() { }

  ngOnInit() {
  }

}
