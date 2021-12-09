import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class AlertService {

    constructor(private toastController: ToastController) { }

    public async presentToast(message: any): Promise<void> {
        const toast = await this.toastController.create({
            message,
            duration: 3000,
            position: 'middle',
            color: 'dark'
        });
        toast.present();
    }

    // TODO: Implement custom styling and sizes of toast messages.
}
