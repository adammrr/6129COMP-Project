import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-request-newfilm',
  templateUrl: './request-newfilm.page.html',
  styleUrls: ['./request-newfilm.page.scss'],
})
export class RequestNewfilmPage implements OnInit {

  constructor(
    public modalCtr: ModalController
) { }

public ngOnInit(): void {
}

async close() {
    const closeModal: string = "Modal Closed";
    await this.modalCtr.dismiss(closeModal);
  }

}
