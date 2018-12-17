import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginContainerComponent } from '../layout/container/login-container.component';
import { LoginCardComponent } from './login-card/login-card.component';

const loginRoutes: Routes = [
  {
      path: 'home',
      component: LoginContainerComponent,
      children: [
          { path: '', component: LoginCardComponent, pathMatch: 'full' },
          { path: 'login', component: LoginCardComponent }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(loginRoutes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
