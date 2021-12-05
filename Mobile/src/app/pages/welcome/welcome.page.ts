import { Component, NgModule, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { RestService } from 'src/app/services/rest.service';


@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.page.html',
    styleUrls: ['./welcome.page.scss'],
})

export class WelcomePage implements OnInit {

    public user: any;
    public pendingRequests: any = [];
    public seizures: any = [];

    constructor(
        private authService: AuthService,
        private restService: RestService
    ) { }

    public ngOnInit(): void {
        this.seizures = [];
        this.pendingRequests = [];
        this.user = this.authService.getLoggedInUser();

        // Displays list of pending requests.
        this.restService.getRequestsById(this.user.userId).subscribe(async (result: any) => {
            if (result) {
                for (const request of result.data) {
                    if (request.status === 'Pending') {
                        this.pendingRequests.push(request);
                    }
                }
            }
        });

        this.restService.getSeizureHistory(this.user.userId).subscribe(async (result: any) => {
            this.seizures = result.data;
        });
    }
}
