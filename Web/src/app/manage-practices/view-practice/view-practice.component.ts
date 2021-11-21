import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-view-practice',
  templateUrl: './view-practice.component.html',
  styleUrls: ['./view-practice.component.scss']
})
export class ViewPracticeComponent implements OnInit {
  practiceId: number = 0;
  practice:any;

  messageState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  messageStateObs: Observable<boolean> = this.messageState.asObservable();

  private sub: any;

  modalRef?: BsModalRef;
  constructor(private modalService: BsModalService, private route: ActivatedRoute, private restService: RestService, public loadingService: LoadingService, private formBuilder: FormBuilder) { }

  detailsForm = this.formBuilder.group({
    practiceId: '',
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
      practiceId: this.detailsForm.controls['practiceId'].value,
      practiceName: this.detailsForm.controls['practiceName'].value,
      address1: this.detailsForm.controls['address1'].value,
      address2: this.detailsForm.controls['address2'].value,
      address3: this.detailsForm.controls['address3'].value,
      postcode: this.detailsForm.controls['postcode'].value,
      telephone: this.detailsForm.controls['telephone'].value
    };
    this.restService.updatePractice(updateDetails).subscribe(async (updateResult: any) => {
      console.log(updateResult);
      this.modalRef?.hide();
      this.messageState.next(true);
    });
  }

  onDeclineModal(){
    this.modalRef?.hide();
  }

  onCloseToast(){
    this.messageState.next(false);
  }

  ngOnInit(): void {
    console.log("START");
    this.sub = this.route.params.subscribe(params => {
      this.practiceId = +params['id'];
    });
    console.log("END");
    console.log("GET USER");

    this.loadingService.setLoaded(false);
    this.restService.getPractice(this.practiceId).subscribe( data => {
      this.practice = data.data;
      console.log(this.practice);
      this.loadingService.setLoaded(true);
      this.detailsForm.controls['practiceId'].setValue(this.practice.practiceId);
      this.detailsForm.controls['practiceName'].setValue(this.practice.practiceName);
      this.detailsForm.controls['address1'].setValue(this.practice.address1);
      this.detailsForm.controls['address2'].setValue(this.practice.address2);
      this.detailsForm.controls['address3'].setValue(this.practice.address3);
      this.detailsForm.controls['postcode'].setValue(this.practice.postcode);
      this.detailsForm.controls['telephone'].setValue(this.practice.telephone);


    });
  }

}
