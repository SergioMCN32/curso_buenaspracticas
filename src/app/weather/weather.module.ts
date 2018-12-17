import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { WeatherCardComponent } from './weather-card.component';
import { WeatherForecastComponent } from './weather-forecast.component';
import { WeatherSearchComponent } from './weather-search.component';
import { WeatherService } from './weather.service';
import { WeatherRoutingModule } from './weather-routing.module';



@NgModule({
  imports: [
    CommonModule,
    SharedModule,
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
  ],
  providers: [WeatherService]
})
export class WeatherModule { }
