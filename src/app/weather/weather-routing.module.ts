import { NgModule } from "@angular/core";
import { AuthGuardService } from '../core/auth-guard/auth-guard.service';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from '../layout/main-layout/main-layout.component';
import { WeatherSearchComponent } from "./weather-search.component";
import { WeatherCardComponent } from "./weather-card.component";

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
    imports:[
        RouterModule.forChild(weatherRoutes)
    ],
    exports:[
        RouterModule
    ]
})
export class WeatherRoutingModule{};