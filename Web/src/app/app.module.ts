import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './shared/navigation-bar/navigation-bar.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { RoutingErrorComponent } from './shared/routing-error/routing-error.component';
import { SignOutComponent } from './shared/sign-out/sign-out.component';
import { SignInComponent } from './shared/sign-in/sign-in.component';
import { FilmPageComponent } from './film-page/film-page.component';
import { ManageAccountPageComponent } from './manage-account-page/manage-account-page.component';
import { AuthService } from './services/auth.service';
import { NavCardComponent } from './dashboard-page/shared/nav-card/nav-card.component';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManagePracticesComponent } from './manage-practices/manage-practices.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ViewUserComponent } from './manage-users/view-user/view-user.component';
import { ViewPracticeComponent } from './manage-practices/view-practice/view-practice.component';
import { NewUserComponent } from './manage-users/new-user/new-user.component';
import { NewPracticeComponent } from './manage-practices/new-practice/new-practice.component';
import { ViewPatientsComponent } from './view-patients/view-patients.component';
import { ViewPracticesComponent } from './view-practices/view-practices.component';
import { ManageRequestsComponent } from './manage-requests/manage-requests.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignOutComponent,
    NavigationBarComponent,
    RoutingErrorComponent,
    DashboardPageComponent,
    FilmPageComponent,
    ManageAccountPageComponent,
    NavCardComponent,
    ManageUsersComponent,
    ManagePracticesComponent,
    LoadingComponent,
    ViewUserComponent,
    ViewPracticeComponent,
    NewUserComponent,
    NewPracticeComponent,
    ViewPatientsComponent,
    ViewPracticesComponent,
    ManageRequestsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NoopAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ModalModule.forRoot(),
    TooltipModule.forRoot()
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
