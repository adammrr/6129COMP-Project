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
    public pendingRequests = [];
    public approvedRequests = [];
    public rejectedRequests = [];

    constructor(
        private restService: RestService,
        private authService: AuthService
    ) { }

    public ngOnInit(): void {
        this.user = this.authService.getLoggedInUser();
        this.restService.getRequestsById(this.user.userId).subscribe(async (result: any) => {
            if (result) {
                for (const request of result.data) {
                    if (request.status === 'Pending') {
                        this.pendingRequests.push(request);
                    }
                    if (request.status === 'Approved') {
                        this.approvedRequests.push(request);
                    }
                    if (request.status === 'Rejected') {
                        this.rejectedRequests.push(request);
                    }
                }
            }
        });
    }
}
