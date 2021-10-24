import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RoutingErrorComponent } from './shared/routing-error/routing-error.component';
import { SignOutComponent } from './shared/sign-out/sign-out.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: DashboardComponent },
  { path: 'sign-out', component: SignOutComponent },
  { path: '**', component: RoutingErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
