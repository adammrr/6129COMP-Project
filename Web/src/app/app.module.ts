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
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NoopAnimationsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
