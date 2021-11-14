import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { RestService } from 'src/app/services/rest.service';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.page.html',
    styleUrls: ['./user-profile.page.scss'],

})
export class UserProfilePage implements OnInit {

    public user;
    public epilepsyDetails;
    public userInformationForm!: FormGroup;
    public epilepsyDetailsForm!: FormGroup;
    public segmentModel = 'user-information';
    public userInformationFormChanged = 0;
    public hasEpilepsyDetails: boolean;

    constructor(
        private authService: AuthService,
        private restService: RestService,
        private formBuilder: FormBuilder,
        private alertService: AlertService
    ) {
        this.userInformationForm = this.formBuilder.group({
            firstName: '',
            surname: '',
            gender: '',
            dob: '',
            address1: '',
            address2: '',
            address3: '',
            postcode: '',
            email: '',
            changePassword: ''
        });

        this.epilepsyDetailsForm = this.formBuilder.group({
            seizureType: '',
            triggerDetails: '',
            yearsSuffering: 0,
            frequency: ''
        });
    }

    public ngOnInit(): void {
        this.user = this.authService.getLoggedInUser();
        this.userInformationForm.patchValue({
            firstName: this.user.firstName,
            surname: this.user.surname,
            gender: this.user.gender,
            dob: this.user.dob,
            address1: this.user.address1,
            address2: this.user.address2,
            address3: this.user.address3,
            postcode: this.user.postcode,
            email: this.user.email
        });
        this.userInformationForm.statusChanges.subscribe(statusChanges => {
            if (statusChanges) {
                this.userInformationFormChanged++;
            }
        });
        this.restService.getHasEpilepticDetails(this.user.userId).subscribe(async (hasDetails: any) => {
            this.hasEpilepsyDetails = hasDetails.data;
        });

        this.restService.getEpilepticDetails(this.user.userId).subscribe(async (epilepticDetails: any) => {
            this.epilepsyDetails = epilepticDetails;
        });
    }

    public updateUserInformation(): void {
        const formValues = this.userInformationForm.value;
        const updateDetails = {
            gender: formValues.gender,
            address1: formValues.address1,
            address2: formValues.address2,
            address3: formValues.address3,
            postcode: formValues.postcode,
            email: formValues.email,
            password: formValues.changePassword
        };
        if (this.userInformationFormChanged === 0) {
            this.alertService.presentToast('Changes not made the form has no new values');
            return;
        }
        this.restService.updateUser(this.user.userId, updateDetails).subscribe(async (validationResult: any) => {
            if (validationResult.error === false) {
                this.alertService.presentToast('Success user details for ' + this.user.firstName + ' Have been updated.');
                this.userInformationFormChanged = 0;
            } else {
                this.alertService.presentToast('There is an error with the credentials you have entered, please try again.');
                return;
            }
        });
    }

    public segmentChanged(): void {
        if (this.hasEpilepsyDetails) {
            this.epilepsyDetailsForm.patchValue({
                seizureType: this.epilepsyDetails.data.seizureType,
                triggerDetails: this.epilepsyDetails.data.triggerDetails,
                yearsSuffering: this.epilepsyDetails.data.yearsSuffering,
                frequency: this.epilepsyDetails.data.frequency
            });
        }
    }

    //TODO: Working on this
    /*   public updateEpilepsyInformation(): void {
        const formValues = this.epilepsyDetailsForm.value;
        const updateInformation = {
          seizureType: formValues.seizureType,
          triggerDetails: formValues.triggerDetails,
          yearsSuffering: formValues.yearsSuffering,
          frequency: formValues.frequency
        };
      } */
}
