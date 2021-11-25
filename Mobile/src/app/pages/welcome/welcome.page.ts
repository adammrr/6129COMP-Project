import { Component, NgModule, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { RestService } from 'src/app/services/rest.service';


@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.page.html',
    styleUrls: ['./welcome.page.scss'],
})

export class WelcomePage implements OnInit {

    public user;

    public pendingRequests = [];

    public pending;

    constructor(
        private authService: AuthService,
        private restService: RestService
    ) { }

    public ngOnInit(): void {
        this.user = this.authService.getLoggedInUser();
        this.restService.getRequestsById(this.user.userId).subscribe(async (result: any) => {
            if (result) {
                for (const request of result.data) {
                    if (request.status === 'Pending') {
                        this.pendingRequests.push(request);
                    }
                }
            }
        });
        this.pending = this.pendingRequests.length;
        console.log(this.pending)
    }
}

