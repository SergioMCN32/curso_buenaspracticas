import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { WeatherCardComponent } from './weather-card.component';
import { WeatherForecastComponent } from './component-weather-forecast';
import { WeatherSearchComponent } from './component-weather-search';
import { WeatherService } from './weather.service';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from '../layout/main-layout/main-layout.component';
import { AuthGuardService } from '../core/auth-guard/auth-guard.service';

const weatherRoutes: Routes = [
  {
    path: 'weather',
    component: MainLayoutComponent,
    children: [
      { path: 'search', component: WeatherSearchComponent },
      { path: 'info/:cityName', component: WeatherCardComponent, canActivate: [AuthGuardService] }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(weatherRoutes)
  ],
  declarations: [
    WeatherCardComponent,
    WeatherForecastComponent,
    WeatherSearchComponent
  ],
  exports: [
    WeatherCardComponent,
    WeatherSearchComponent,
    RouterModule
  ],
  providers: [WeatherService]
})
export class WeatherModule { }
