import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { RestService } from 'src/app/services/rest.service';

@Component({
    selector: 'app-user-requests',
    templateUrl: './user-requests.page.html',
    styleUrls: ['./user-requests.page.scss'],
})


export class UserRequestsPage implements OnInit {

    public user;

    constructor(
        private restService: RestService,
        private authService: AuthService
    ) { }

    public ngOnInit(): void {
        this.user = this.authService.getLoggedInUser();
        this.restService.getRequests().subscribe(async (result: any) => {
        });
        this.restService.getRequestsById(this.user.userId).subscribe(async (result: any) => {
        });
    }
}
