import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
})

export class FooterComponent implements OnInit {
    constructor(
        public modalController: ModalController
        ) {

         }

    public ngOnInit(): void { }

    //TODO: Implement ability to pass in paramaters of custom buttons and icons
}
