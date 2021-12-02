import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-new-practice',
  templateUrl: './new-practice.component.html',
  styleUrls: ['./new-practice.component.scss']
})
export class NewPracticeComponent implements OnInit {
  //Variables
  private modalRef?: BsModalRef;
  public messageConfirmState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public messageConfirmStateObs: Observable<boolean> = this.messageConfirmState.asObservable();
  public messageErrorState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public messageErrorStateObs: Observable<boolean> = this.messageErrorState.asObservable();
  public errorMessage: string = "";

  constructor(private route: ActivatedRoute, public loadingService: LoadingService, private restService: RestService, private formBuilder: FormBuilder, private modalService: BsModalService) { }
  //Form builder group for practice details form
  public detailsForm = this.formBuilder.group({
    practiceName: '',
    address1: '',
    address2: '',
    address3: '',
    postcode: '',
    telephone: ''
  });

  //Open the relevant modal
  public onSubmit(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  //Confirm modal and take action
  public onConfirmModal(){
    let updateDetails = {
      practiceName: this.detailsForm.controls['practiceName'].value,
      address1: this.detailsForm.controls['address1'].value,
      address2: this.detailsForm.controls['address2'].value,
      address3: this.detailsForm.controls['address3'].value,
      postcode: this.detailsForm.controls['postcode'].value,
      telephone: this.detailsForm.controls['telephone'].value
    };
    this.restService.createPractice(updateDetails).subscribe(async (updateResult: any) => {
      console.log(updateResult);
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

  //Close the Modal
  public onDeclineModal(){
    this.modalRef?.hide();
  }

  //Close the Confirm Popup
  public onCloseConfirmToast(){
    this.messageConfirmState.next(false);
  }

  //Close the Error Popup
  public onCloseErrorToast(){
    this.messageErrorState.next(false);
  }

  public ngOnInit(): void { }
}
