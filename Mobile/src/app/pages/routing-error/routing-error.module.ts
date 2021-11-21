import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RoutingErrorPageRoutingModule } from './routing-error-routing.module';
import { RoutingErrorPage } from './routing-error.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RoutingErrorPageRoutingModule,
        SharedModule
    ],
    declarations: [RoutingErrorPage]
})
export class RoutingErrorPageModule { }
