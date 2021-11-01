import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    loggedIn: boolean = false;


    constructor(public router: Router, private authService: AuthService) {
      this.authService.isLoggedIn().subscribe(value => this.signInState(value));
    }

    signInState(value: boolean){
      this.loggedIn = value;
    }

}
