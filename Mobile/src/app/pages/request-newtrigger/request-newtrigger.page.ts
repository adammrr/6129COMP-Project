import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-request-newtrigger',
  templateUrl: './request-newtrigger.page.html',
  styleUrls: ['./request-newtrigger.page.scss'],
})
export class RequestNewtriggerPage implements OnInit {

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
