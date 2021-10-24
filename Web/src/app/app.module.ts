import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './shared/navigation-bar/navigation-bar.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { RoutingErrorComponent } from './shared/routing-error/routing-error.component';
import { SignOutComponent } from './shared/sign-out/sign-out.component';
import { SignInComponent } from './shared/sign-in/sign-in.component';
import { FilmPageComponent } from './film-page/film-page.component';
import { ManageAccountPageComponent } from './manage-account-page/manage-account-page.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignOutComponent,
    NavigationBarComponent,
    RoutingErrorComponent,
    DashboardPageComponent,
    FilmPageComponent,
    ManageAccountPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
