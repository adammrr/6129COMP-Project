import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserRequestsPage } from 'src/app/pages/user-requests/user-requests.page';



@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {


  constructor() { }

  ngOnInit() {}


  async openRequestModal(modalCtrl: ModalController) {
    const modal = await modalCtrl.create({
      component: UserRequestsPage,
      })
    };
}
