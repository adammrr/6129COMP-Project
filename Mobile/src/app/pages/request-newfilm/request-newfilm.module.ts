import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequestNewfilmPageRoutingModule } from './request-newfilm-routing.module';

import { RequestNewfilmPage } from './request-newfilm.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RequestNewfilmPageRoutingModule
  ],
  declarations: [RequestNewfilmPage]
})
export class RequestNewfilmPageModule {}
