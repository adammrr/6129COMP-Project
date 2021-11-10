import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.page.html',
    styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

    public userName = '';

    constructor(
        private authService: AuthService
    ) { }

    public ngOnInit(): void {
        this.userName = this.authService.getName();
    }

}
