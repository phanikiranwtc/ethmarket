import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutes } from 'src/app/app-routes.enum';
import { LoginComponent } from 'src/app/login/login.component';

const routes: Routes = [
  {
    path: AppRoutes.Base,
    pathMatch: 'full',
    redirectTo: AppRoutes.Login//AppRoutes.Dashboard
    // canActivate: [LoggedInGuard]
  },
  {
    path: AppRoutes.Login,
    component: LoginComponent
    // canActivate: [LoggedInGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
