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
  modalRef?: BsModalRef;

  messageConfirmState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  messageConfirmStateObs: Observable<boolean> = this.messageConfirmState.asObservable();

  messageErrorState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  messageErrorStateObs: Observable<boolean> = this.messageErrorState.asObservable();
  errorMessage: string = "";

  constructor(private route: ActivatedRoute, public loadingService: LoadingService, private restService: RestService, private formBuilder: FormBuilder, private modalService: BsModalService) { }

  detailsForm = this.formBuilder.group({
    practiceName: '',
    address1: '',
    address2: '',
    address3: '',
    postcode: '',
    telephone: ''
  });

  onSubmit(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  onConfirmModal(){
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

  onDeclineModal(){
    this.modalRef?.hide();
  }

  onCloseConfirmToast(){
    this.messageConfirmState.next(false);
  }

  onCloseErrorToast(){
    this.messageErrorState.next(false);
  }

  ngOnInit(): void {

  }
}
