import { Component, OnInit, TemplateRef } from '@angular/core';
import { AnimationStyleMetadata } from '@angular/animations';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';
import { RestService } from 'src/app/services/rest.service';
import { AuthService } from '../services/auth.service';


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

  constructor(private modalService: BsModalService, private route: ActivatedRoute, private authService: AuthService, private restService: RestService, public loadingService: LoadingService, private formBuilder: FormBuilder) { }
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


  //Initialise page with data for user details, user epilepsy details and practices assigned to
  public ngOnInit(): void {
    this.loadingService.setLoaded(false);
    this.userId = this.authService.getUserId();
    console.log("User ID:", this.userId);

    this.restService.getUser(this.userId).subscribe( data => {
      this.user = data.data;
      this.detailsForm.controls['userId'].setValue(this.user.userId);
      this.detailsForm.controls['email'].setValue(this.user.email);
      this.detailsForm.controls['firstName'].setValue(this.user.firstName);
      this.detailsForm.controls['surname'].setValue(this.user.surname);
      this.detailsForm.controls['gender'].setValue(this.user.gender);
      this.detailsForm.controls['dob'].setValue(this.user.dob.substring(0,10));
      this.detailsForm.controls['address1'].setValue(this.user.address1);
      this.detailsForm.controls['address2'].setValue(this.user.address2);
      this.detailsForm.controls['address3'].setValue(this.user.address3);
      this.detailsForm.controls['postcode'].setValue(this.user.postcode);
      this.loadingService.setLoaded(true);
    });
  }

  //Open generic modal
  public onSubmit(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  //Close popup toast
  public onCloseToast() {
    this.messageState.next(false);
  }

  //Update user details on confirm from modal
  public onConfirmModal() {
    let updateDetails = {
      userId: this.detailsForm.controls['userId'].value,
      email: this.detailsForm.controls['email'].value,
      firstName: this.detailsForm.controls['firstName'].value,
      surname: this.detailsForm.controls['surname'].value,
      gender: this.detailsForm.controls['gender'].value,
      dob: this.detailsForm.controls['dob'].value,
      address1: this.detailsForm.controls['address1'].value,
      address2: this.detailsForm.controls['address2'].value,
      address3: this.detailsForm.controls['address3'].value,
      postcode: this.detailsForm.controls['postcode'].value,
    };
    this.restService.updateUser(updateDetails).subscribe(async (updateResult: any) => {
      this.modalRef?.hide();
      this.messageState.next(true);
    });
  }

  //Close modal
  public onCloseModal() {
    this.modalRef?.hide();
  }

}

