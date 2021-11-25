import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LogSeizurePageRoutingModule } from './log-seizure-routing.module';
import { LogSeizurePage } from './log-seizure.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule,
        LogSeizurePageRoutingModule,
        SharedModule
    ],
    declarations: [LogSeizurePage]
})
export class LogSeizurePageModule { }
