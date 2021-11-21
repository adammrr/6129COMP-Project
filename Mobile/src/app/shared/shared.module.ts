import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SharedRoutingModule } from './shared-routing.module';
import { FooterComponent } from './components/footer/footer.component';
import { CentralContainerComponent } from './components/central-container/central-container.component';

@NgModule({
  declarations: [FooterComponent, CentralContainerComponent],
  imports: [
    IonicModule,
    CommonModule,
    SharedRoutingModule,
  ],
  exports: [
    FooterComponent,
    CentralContainerComponent
  ]
})
export class SharedModule { }
