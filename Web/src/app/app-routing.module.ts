import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { FilmPageComponent } from './film-page/film-page.component';
import { ManageAccountPageComponent } from './manage-account-page/manage-account-page.component';
import { ManagePracticesComponent } from './manage-practices/manage-practices.component';
import { NewPracticeComponent } from './manage-practices/new-practice/new-practice.component';
import { ViewPracticeComponent } from './manage-practices/view-practice/view-practice.component';
import { ManageRequestsComponent } from './manage-requests/manage-requests.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { NewUserComponent } from './manage-users/new-user/new-user.component';
import { ViewUserComponent } from './manage-users/view-user/view-user.component';
import { AuthGuard } from './services/auth.guard';
import { RoutingErrorComponent } from './shared/routing-error/routing-error.component';
import { SignInComponent } from './shared/sign-in/sign-in.component';
import { SignOutComponent } from './shared/sign-out/sign-out.component';
import { ViewPatientsComponent } from './view-patients/view-patients.component';
import { ViewPracticesComponent } from './view-practices/view-practices.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},

  { path: 'login', component: SignInComponent },

  { path: 'home', component: DashboardPageComponent, canActivate: [AuthGuard] },
  { path: 'films', component: FilmPageComponent, canActivate: [AuthGuard] },

  { path: 'manage-users', component: ManageUsersComponent, canActivate: [AuthGuard] },
  { path: 'manage-users/create-user/:type', component: NewUserComponent, canActivate: [AuthGuard] },
  { path: 'manage-users/:id', canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full'},
      { path: 'overview', component: ViewUserComponent}
    ]
  },

  { path: 'view-my-patients', component: ViewPatientsComponent, canActivate: [AuthGuard] },
  { path: 'view-my-patients/:id', canActivate: [AuthGuard],
    children: [
      { path: '', component: ViewPatientsComponent}
    ]
  },
  { path: 'view-my-practices', component: ViewPracticesComponent, canActivate: [AuthGuard] },
  
  { path: 'manage-requests', component: ManageRequestsComponent, canActivate: [AuthGuard] },

  { path: 'manage-practices', component: ManagePracticesComponent, canActivate: [AuthGuard] },
  { path: 'manage-practices/create-practice', component: NewPracticeComponent, canActivate: [AuthGuard] },
  { path: 'manage-practices/:id', canActivate: [AuthGuard],
  children: [
    { path: '', redirectTo: 'overview', pathMatch: 'full'},
    { path: 'overview', component: ViewPracticeComponent}
  ]
},
  { path: 'account', component: ManageAccountPageComponent, canActivate: [AuthGuard] },
  { path: 'sign-out', component: SignOutComponent },
  { path: '**', component: RoutingErrorComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
