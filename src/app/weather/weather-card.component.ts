import { Component, OnInit } from '@angular/core';
import { Weather } from './weather';
import { Forecast } from './forecast';
import { WeatherService } from './weather.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-weather-card',
  template: `
  <mat-card class="weather-card">
  <mat-card-header class="weather-header">
    <div mat-card-avatar class="weather-header-icon">
      <app-weather-icon [weatherInfo]="weather.info"></app-weather-icon>
    </div>
    <mat-card-title>{{weather.city}}</mat-card-title>
    <mat-card-subtitle>{{weather.hourMessure}}</mat-card-subtitle>
  </mat-card-header>
  <mat-card-content>
    <div class="weather-card-content-info">
      <mat-grid-list cols="4" rowHeight="30px">
        <mat-grid-tile>
          <i class="wi wi-strong-wind"></i> {{weather.windspeed}} km/h</mat-grid-tile>
        <mat-grid-tile>
          <i class="wi wi-wind from-{{weather.winddirection}}-deg"></i>
        </mat-grid-tile>
        <mat-grid-tile>
          <i class="wi wi-humidity"></i> {{weather.humidity / 100 | percent:'2.0-2' }}</mat-grid-tile>
        <mat-grid-tile>
          <i class="wi wi-barometer"></i> {{weather.pressure | number:'4.1-2'}}
        </mat-grid-tile>
      </mat-grid-list>
    </div>
    <mat-grid-list cols="2" rowHeight="30px">
      <mat-grid-tile colspan="2" class="weather-info-text">
        {{weather.info | lowercase}}
      </mat-grid-tile>
      <mat-grid-tile class="weather-info-temp-up">
        <i class="wi wi-direction-up"></i> {{weather.maxtemperature | celsius}}
      </mat-grid-tile>
      <mat-grid-tile class="weather-info-temp-down">
        <i class="wi wi-direction-down"></i> {{weather.mintemperature | celsius}}
      </mat-grid-tile>
    </mat-grid-list>
    <mat-grid-list cols="1" rowHeight="80px">
      <mat-grid-tile class="weather-info-temp">
        <div class="number" [ngStyle]="{color: getColorTemperature()}">
          {{weather.temperature | celsius:false}}</div>
        <div class="measure">ºC</div>
      </mat-grid-tile>
    </mat-grid-list>
    <mat-divider></mat-divider>
    <mat-grid-list cols="5" rowHeight="120px">
      <mat-grid-tile class="weather-info-sunrise">
        <div class="hour">{{weather.sunrise}}</div>
        <i class="wi wi-sunrise"></i>
      </mat-grid-tile>
      <mat-grid-tile colspan="3">
        <mat-progress-spinner class="sunrise-sunset-spinner" diameter="120" strokeWidth="110" mode="determinate" [value]="weather.percentToSunset">
        </mat-progress-spinner>
      </mat-grid-tile>
      <mat-grid-tile class="weather-info-sunset">
        <div class="hour">{{weather.sunset}}</div>
        <i class="wi wi-sunset"></i>
      </mat-grid-tile>
    </mat-grid-list>
    <app-weather-forecast [forecasts]="weather.forecasts"></app-weather-forecast>
  </mat-card-content>
</mat-card>
  `,
  styles: [
    `
    .weather-card {
      width: 400px;
      padding: 0px;
    }
    .weather-header {
      position: relative;
      padding: 12px;
      background:transparent;
      min-height: 60px;
  }
  .weather-header:before {
      position: absolute;
      display: block;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      content: ' ';
      z-index: 1;
      opacity: 0.8;
      background-image: url('https://drive.google.com/uc?id=1DRGmofyk2KbKvY8HF8vvqcBGj7VRXKnY');
  }

  .weather-header mat-card-title {
      margin-left: 20px;
      color: #fff ;
      z-index: 2;
      position: relative;
  }

  .weather-header mat-card-subtitle {
      margin-left: 20px;
      font-size:16px;
      color: #fff;
      z-index: 2;
      position: relative;
  }

  .weather-header-icon {
      font-size:48px;
      color: #fff;
      z-index: 2;
  }

  .weather-card-content-info {
      background-color: #e0e0e0 !important;
  }

  .weather-card-content-info .wi{
      font-size: 22px;
      margin-right: 4px;
  }

  .weather-info-text {
      font-size:22px;
      margin-top:4px;
  }

  .weather-info-temp-up {
      font-size:24px;
  }

  .weather-info-temp-up .wi{
      font-size: 30px;
      margin-right: 4px;
      color:#D32F2F;
  }

  .weather-info-temp-down {
      font-size:24px;
  }

  .weather-info-temp-down .wi{
      font-size: 30px;
      margin-right: 4px;
      color:#1E88E5;
  }

  .weather-info-temp .number {
      font-size: 80px;
      font-weight: bolder;
  }

  .weather-info-temp .measure {
      font-size: 32px;
  }

  .sunrise-sunset-spinner {
      position: absolute;
      margin-top: 58px;
      transform: rotate(-90deg);
  }

  :host /deep/ .mat-progress-spinner circle, .mat-spinner circle {
      stroke: #ffa828;
      stroke-opacity: 0.6;
  }

  .weather-info-sunrise {
      margin-left: 16px;
  }

  .weather-info-sunrise .wi {
      margin-top: 50px;
      font-size: 30px;
  }

  .weather-info-sunrise .hour {
      position: absolute;
      margin-top: -20px;
  }

  .weather-info-sunset {
      margin-left: -16px;
  }

  .weather-info-sunset .wi {
      margin-top: 50px;
      font-size: 30px;
  }

  .weather-info-sunset .hour {
      position: absolute;
      margin-top: -20px;
  }
    `]

})
export class WeatherCardComponent implements OnInit {

  weather: Weather = new Weather();
  cityName: string;

  constructor(
    private _weatherService: WeatherService,
    private _activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe(
      params => {
        this.cityName = <string>(params['cityName'] ? params['cityName'] : 'Madrid, ES');
        this._weatherService.getWeatherInfo(this.cityName).subscribe(
          data => {
            if (data['query'].results === undefined) {
              alert('La ciudad buscada no existe');
            } else {
              this.weather = this._weatherService.mapResult(data['query'].results.channel);
            }
          },
          error => {
            alert(error.message);
          }
        );

      }
    );
  }

  public getColorTemperature(): string {
    if (this.weather !== undefined && this.weather.temperature >= 24) {
      return '#EF6C00';
    }

    if (this.weather !== undefined && this.weather.temperature <= 10) {
      return '#0277BD';
    }

    return '#212121';
  }

}
