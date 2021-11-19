import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { WelcomePageRoutingModule } from './welcome-routing.module';
import { WelcomePage } from './welcome.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        WelcomePageRoutingModule,
        SharedModule
    ],
    declarations: [WelcomePage]
})

export class WelcomePageModule { }
