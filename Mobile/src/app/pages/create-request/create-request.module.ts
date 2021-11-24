import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CreateRequestPageRoutingModule } from './create-request-routing.module';
import { CreateRequestPage } from './create-request.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CreateRequestPageRoutingModule,
    SharedModule
  ],
  declarations: [CreateRequestPage]
})
export class CreateRequestPageModule {}
