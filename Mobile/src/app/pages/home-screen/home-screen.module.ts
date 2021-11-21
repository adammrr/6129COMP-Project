import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomeScreenPageRoutingModule } from './home-screen-routing.module';
import { HomeScreenPage } from './home-screen.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HomeScreenPageRoutingModule,
        SharedModule
    ],
    declarations: [HomeScreenPage]
})
export class HomeScreenPageModule { }
