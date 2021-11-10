import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    public loginObject;
    public loginForm: FormGroup;

    constructor(
        private authService: AuthService,
        private formBuilder: FormBuilder,
        private navCtrl: NavController
    ) {
        this.loginForm = this.formBuilder.group({
            email: '',
            password: '',
        });
    }

    public ngOnInit(): void { }

    public onSubmit(): void {
        const formValues = this.loginForm.value;
        this.loginObject = {
            email: formValues.email,
            password: formValues.password,
        };
        this.authService.signIn(this.loginObject.email, this.loginObject.password);
        this.authService.isLoggedIn().subscribe(async (validationResult: any) => {
            if (validationResult === true) {
                this.navCtrl.navigateForward('/welcome');
            }
        });
    }
}
