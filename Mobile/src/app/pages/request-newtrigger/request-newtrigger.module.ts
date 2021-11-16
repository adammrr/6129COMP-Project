import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequestNewtriggerPageRoutingModule } from './request-newtrigger-routing.module';

import { RequestNewtriggerPage } from './request-newtrigger.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RequestNewtriggerPageRoutingModule
  ],
  declarations: [RequestNewtriggerPage]
})
export class RequestNewtriggerPageModule {}
