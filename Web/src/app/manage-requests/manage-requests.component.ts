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
  requests: any = [];


  constructor(private modalService: BsModalService, public loadingService: LoadingService, private router: Router, private restService: RestService, private authService: AuthService) { }

  ngOnInit(): void {
    this.loadingService.setLoaded(false);

    if(this.authService.getAccountType() != 'administrator'){
      this.router.navigate(['/home']);
    }
    this.restService.getRequests().subscribe( data => {
      this.requests = data.data;
      console.log(this.requests);
      
      for (let i = 0; i < this.requests.length; i++) {
        let obj = JSON.parse(this.requests[i].details);
        this.requests[i].details = obj;
        
      }

      console.log(this.requests);

      this.loadingService.setLoaded(true);
    });

  }

}
