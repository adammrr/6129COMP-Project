import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { RequestNewfilmPage } from '../request-newfilm/request-newfilm.page';
import { RequestNewtriggerPage } from '../request-newtrigger/request-newtrigger.page';

@Component({
    selector: 'app-user-requests',
    templateUrl: './user-requests.page.html',
    styleUrls: ['./user-requests.page.scss'],
})
export class UserRequestsPage implements OnInit {

    constructor(
        public modalCtr: ModalController
    ) { }

    public ngOnInit(): void {
    }

    async close() {
        const closeModal: string = "Modal Closed";
        await this.modalCtr.dismiss(closeModal);
      }

    async newFilmModal(modalCtrl: ModalController) {
        const modal = await modalCtrl.create({
            component: RequestNewfilmPage,
          })
        };


    async newTriggerModal(modalCtrl: ModalController) {
        const modal = await modalCtrl.create({
            component: RequestNewtriggerPage,
            })
        };

}
