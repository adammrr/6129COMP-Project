import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationBarComponent } from './shared/navigation-bar/navigation-bar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RoutingErrorComponent } from './shared/routing-error/routing-error.component';
import { SignOutComponent } from './shared/sign-out/sign-out.component';
import { SignInComponent } from './shared/sign-in/sign-in.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    DashboardComponent,
    RoutingErrorComponent,
    SignOutComponent,
    SignInComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
