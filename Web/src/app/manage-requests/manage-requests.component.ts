import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AuthService } from '../services/auth.service';
import { LoadingService } from '../services/loading.service';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-manage-requests',
  templateUrl: './manage-requests.component.html',
  styleUrls: ['./manage-requests.component.scss']
})
export class ManageRequestsComponent implements OnInit {
  pendingRequests: any = [];
  approvedRequests: any = [];
  rejectedRequests: any = [];


  constructor(private modalService: BsModalService, public loadingService: LoadingService, private router: Router, private restService: RestService, private authService: AuthService) { }

  ngOnInit(): void {
    this.loadingService.setLoaded(false);

    if(this.authService.getAccountType() != 'administrator'){
      this.router.navigate(['/home']);
    }
    this.restService.getRequests("Pending").subscribe( data => {
      this.pendingRequests = data.data;
      for (let i = 0; i < this.pendingRequests.length; i++) {
        let obj = JSON.parse(this.pendingRequests[i].details);
        this.pendingRequests[i].details = obj;
      }
    });
    this.restService.getRequests("Approved").subscribe( data => {
      this.approvedRequests = data.data;
      for (let i = 0; i < this.approvedRequests.length; i++) {
        let obj = JSON.parse(this.approvedRequests[i].details);
        this.approvedRequests[i].details = obj;
      }
    });
    this.restService.getRequests("Rejected").subscribe( data => {
      this.rejectedRequests = data.data;
      for (let i = 0; i < this.rejectedRequests.length; i++) {
        let obj = JSON.parse(this.rejectedRequests[i].details);
        this.rejectedRequests[i].details = obj;
      }
      this.loadingService.setLoaded(true);
    });
  }

  public reloadRequests(): void {
    this.loadingService.setLoaded(false);
    this.restService.getRequests("Pending").subscribe( data => {
      this.pendingRequests = data.data;
      for (let i = 0; i < this.pendingRequests.length; i++) {
        let obj = JSON.parse(this.pendingRequests[i].details);
        this.pendingRequests[i].details = obj;
      }
    });
    this.restService.getRequests("Approved").subscribe( data => {
      this.approvedRequests = data.data;
      for (let i = 0; i < this.approvedRequests.length; i++) {
        let obj = JSON.parse(this.approvedRequests[i].details);
        this.approvedRequests[i].details = obj;
      }
    });
    this.restService.getRequests("Rejected").subscribe( data => {
      this.rejectedRequests = data.data;
      for (let i = 0; i < this.rejectedRequests.length; i++) {
        let obj = JSON.parse(this.rejectedRequests[i].details);
        this.rejectedRequests[i].details = obj;
      }
      this.loadingService.setLoaded(true);
    });
  }

}
