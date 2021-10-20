import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogSeizurePageRoutingModule } from './log-seizure-routing.module';

import { LogSeizurePage } from './log-seizure.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        LogSeizurePageRoutingModule
    ],
    declarations: [LogSeizurePage]
})
export class LogSeizurePageModule { }
