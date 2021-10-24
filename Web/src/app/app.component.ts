import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    loggedIn: boolean = false;

    constructor(public router: Router) {

    }

    signIn() {
      this.loggedIn = true;
    }

    signInClicked(event: void) {
      this.loggedIn = true;
    }

    signOutClicked(event: void) {
      this.loggedIn = false;
    }
}
