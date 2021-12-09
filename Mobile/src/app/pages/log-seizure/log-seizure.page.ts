import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { RestService } from 'src/app/services/rest.service';

@Component({
    selector: 'app-log-seizure',
    templateUrl: './log-seizure.page.html',
    styleUrls: ['./log-seizure.page.scss'],
})
export class LogSeizurePage implements OnInit {

    public newSeizure?: FormGroup;
    public seizureDetails;
    public filmList = [];
    public triggerList = [];
    public triggers = [];
    public film;
    public user: any;

    constructor(
        private restService: RestService,
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private alert: AlertService,
        private navCtrl: NavController
    ) {
        this.newSeizure = this.formBuilder.group({
            trigger: '',
            severity: '',
            details: ''
        });
    }

    public ngOnInit(): void {
        this.user = this.authService.getLoggedInUserId();
        this.restService.getFilms().subscribe(async (filmResult: any) => {
            this.filmList = filmResult.data;
        });
        this.restService.getTriggers().subscribe(async (filmResult: any) => {
            this.triggerList = filmResult.data;
        });

    }

    //Finds triggers for user when they select a film they watched
    public findTriggers(): void {
        this.triggers = [];
        const f = this.film;

        for (const trigger of this.triggerList) {
            if (trigger.filmId === f) {
                this.triggers.push(trigger);
            }
        }
        this.triggers.sort();
    }

    //Posts seizure to db
    public submitSeizure(): void {
        const formValues = this.newSeizure.value;
        this.seizureDetails = {
            trigger: formValues.trigger,
            severity: formValues.severity,
            details: formValues.details
        };

        this.restService.newSeizure(this.user, this.seizureDetails).subscribe(async (result: any) => {
        });

        this.alert.presentToast('New Seizure Event Logged');
        this.navCtrl.back();
    }
}
