import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WeatherRoutingModule } from './weather-routing.module';
import { WeatherCardComponent } from './weather-card/weather-card.component';
import { WeatherSearchComponent } from './weather-search/weather-search.component';
import { WeatherForecastComponent } from './weather-forecast/weather-forecast.component';

@NgModule({
  imports: [
    CommonModule,
    WeatherRoutingModule
  ],
  declarations: [
    WeatherCardComponent,
    WeatherForecastComponent,
    WeatherSearchComponent
  ],
  exports: [
    WeatherCardComponent,
    WeatherSearchComponent
  ]
})
export class WeatherModule { }
