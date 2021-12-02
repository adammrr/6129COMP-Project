import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { LoadingService } from './services/loading.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public signedIn: boolean = false;

    constructor(public router: Router, public authService: AuthService, public loadingService: LoadingService) {
      this.authService.isLoggedIn().subscribe((value: boolean) => {this.signedIn = value;});
    }
}
