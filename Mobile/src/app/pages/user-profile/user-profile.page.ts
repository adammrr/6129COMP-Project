import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-user-profile',
    templateUrl: './user-profile.page.html',
    styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {

    public user ;

    constructor(private authService: AuthService) { }

    public ngOnInit(): void {
        this.user = this.authService.getLoggedInUser();
        console.log(this.user);
    }
}
