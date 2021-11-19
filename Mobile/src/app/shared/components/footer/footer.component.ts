import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NewRequestComponent } from 'src/app/pages/new-request/new-request.component';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})

export class FooterComponent implements OnInit {
  constructor(public modalController: ModalController) {}

  ngOnInit() {}

  async openRequestsModal() {
    const modal = await this.modalController.create({
      component: NewRequestComponent
    });
  
    return await modal.present();
    }
}
