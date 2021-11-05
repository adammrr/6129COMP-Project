import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SharedRoutingModule } from './shared-routing.module';
import { FooterComponent } from './components/footer/footer.component';


@NgModule({
  declarations: [FooterComponent],
  imports: [
    IonicModule,
    CommonModule,
    SharedRoutingModule,
  ],
  exports: [
FooterComponent
  ]
})
export class SharedModule { }
