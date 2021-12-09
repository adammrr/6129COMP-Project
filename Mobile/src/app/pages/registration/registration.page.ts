import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { NavController } from '@ionic/angular';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.page.html',
    styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

    public registrationForm?: FormGroup;
    public registrationDetails?;

    constructor(
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private navCtrl: NavController,
        private alert: AlertService
    ) {
      // TODO: Validate forms using Reactive Form Validation
        this.registrationForm = this.formBuilder.group({
            firstName: '',
            surname: '',
            gender: '',
            dob: '',
            address1: '',
            address2: '',
            address3: '',
            postcode: '',
            email: '',
            password: ''
        });
    }

    public ngOnInit(): void {
    }

    public onSubmit(): void {
        const formValues = this.registrationForm.value;
        this.registrationDetails = {
            firstName: formValues.firstName,
            surname: formValues.surname,
            gender: formValues.gender,
            dob: formValues.dob,
            address1: formValues.address1,
            address2: formValues.address2,
            address3: formValues.address3,
            postcode: formValues.postcode,
            email: formValues.email,
            password: formValues.password
        };
        this.authService.registerUser(this.registrationDetails);
        this.alert.presentToast('You have successfully registered');
        this.navCtrl.back();
    }
}
