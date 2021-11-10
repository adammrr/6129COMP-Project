import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RoutingErrorPageRoutingModule } from './routing-error-routing.module';
import { RoutingErrorPage } from './routing-error.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RoutingErrorPageRoutingModule
    ],
    declarations: [RoutingErrorPage]
})
export class RoutingErrorPageModule { }
