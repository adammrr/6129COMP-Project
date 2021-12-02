import { Component, OnInit } from '@angular/core';
import { AnimationStyleMetadata } from '@angular/animations';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';
import { RestService } from 'src/app/services/rest.service';


@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account-page.component.html',
  styleUrls: ['./manage-account-page.component.scss']
})
export class ManageAccountPageComponent implements OnInit {
  //Variables
  public userId: number = 0;
  public user:any;
  public messageState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public messageStateObs: Observable<boolean> = this.messageState.asObservable();
  private modalRef?: BsModalRef;

  constructor(private modalService: BsModalService, private route: ActivatedRoute, private restService: RestService, public loadingService: LoadingService, private formBuilder: FormBuilder) { }
  //Form Builder Group for the Logged in User details
  public detailsForm = this.formBuilder.group({
    userId: '',
    email: '',
    firstName: '',
    surname: '',
    gender: '',
    dob: '0000-00-00',
    address1: '',
    address2: '',
    address3: '',
    postcode: ''
  });

  //Initialises the page and loads the user details
  public ngOnInit(): void {
    this.loadingService.setLoaded(false);
    this.restService.getUser(0).subscribe( data => {
      this.user = data;
      console.log(data);
      this.loadingService.setLoaded(true);
    });
  }
}

