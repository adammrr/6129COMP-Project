import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {
  //Variables
  private sub: any;
  public type: string = "patient";
  private modalRef?: BsModalRef;
  public messageConfirmState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public messageConfirmStateObs: Observable<boolean> = this.messageConfirmState.asObservable();
  public messageErrorState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public messageErrorStateObs: Observable<boolean> = this.messageErrorState.asObservable();
  public errorMessage: string = "";

  constructor(private route: ActivatedRoute, public loadingService: LoadingService, private restService: RestService, private formBuilder: FormBuilder, private modalService: BsModalService) { }

  //Form Builder Group for the New User Form
  public detailsForm = this.formBuilder.group({
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

  //Opens the modal
  public onSubmit(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  //Confirm modal and do action
  public onConfirmModal(){
    let updateDetails = {
      email: this.detailsForm.controls['email'].value,
      firstName: this.detailsForm.controls['firstName'].value,
      surname: this.detailsForm.controls['surname'].value,
      gender: this.detailsForm.controls['gender'].value,
      dob: this.detailsForm.controls['dob'].value,
      address1: this.detailsForm.controls['address1'].value,
      address2: this.detailsForm.controls['address2'].value,
      address3: this.detailsForm.controls['address3'].value,
      postcode: this.detailsForm.controls['postcode'].value,
      accountType: this.type
    };
    this.restService.createUser(updateDetails).subscribe(async (updateResult: any) => {
      this.onCloseConfirmToast();
      this.onCloseErrorToast();
      if(updateResult.error == true){
        this.errorMessage = updateResult.data.code;
        this.messageErrorState.next(true);
      }else{
        this.messageConfirmState.next(true);
      }
      this.modalRef?.hide();
    });
  }

  //Close modal
  public onDeclineModal(){
    this.modalRef?.hide();
  }

  //Close confirm popup toast
  public onCloseConfirmToast(){
    this.messageConfirmState.next(false);
  }

  //Close error popup toast
  public onCloseErrorToast(){
    this.messageErrorState.next(false);
  }

  //Initilaise page and get type from router link
  public ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.type = params['type'];
    });
  }

  //On destroy, kill the subscription
  public ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
