import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { FilmPageComponent } from './film-page/film-page.component';
import { ManageAccountPageComponent } from './manage-account-page/manage-account-page.component';
import { ManagePracticesComponent } from './manage-practices/manage-practices.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { AuthGuard } from './services/auth.guard';
import { RoutingErrorComponent } from './shared/routing-error/routing-error.component';
import { SignInComponent } from './shared/sign-in/sign-in.component';
import { SignOutComponent } from './shared/sign-out/sign-out.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},

  { path: 'login', component: SignInComponent },

  { path: 'home', component: DashboardPageComponent, canActivate: [AuthGuard] },
  { path: 'films', component: FilmPageComponent, canActivate: [AuthGuard] },

  { path: 'manage-users', component: ManageUsersComponent, canActivate: [AuthGuard] },
  { path: 'manage-practices', component: ManagePracticesComponent, canActivate: [AuthGuard] },

  { path: 'account', component: ManageAccountPageComponent, canActivate: [AuthGuard] },
  { path: 'sign-out', component: SignOutComponent },
  { path: '**', component: RoutingErrorComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
