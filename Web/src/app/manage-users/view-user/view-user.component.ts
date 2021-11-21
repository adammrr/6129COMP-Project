import { AnimationStyleMetadata } from '@angular/animations';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {
  userId: number = 0;
  user:any;
  practices:any;
  practiceLinks:any;
  selectedPractice:any;

  messageState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  messageStateObs: Observable<boolean> = this.messageState.asObservable();

  private sub: any;
  modalRef?: BsModalRef;

  constructor(private modalService: BsModalService, private route: ActivatedRoute, private restService: RestService, public loadingService: LoadingService, private formBuilder: FormBuilder) { }

  detailsForm = this.formBuilder.group({
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

  assignForm = this.formBuilder.group({
    practiceInput: ''
  });

  assignPractice(template: TemplateRef<any>) {
    console.log("CLICK");
    this.modalRef = this.modalService.show(template, {class: 'modal-lg'});

  }

  onAssignConfirm() {
    let updateDetails = {
      userId: this.userId,
      practiceId: this.assignForm.controls['practiceInput'].value
    };
    this.restService.addPracticeLink(updateDetails).subscribe(async (updateResult: any) => {
      console.log(updateResult);
      this.reloadPracticeLinks();
      this.modalRef?.hide();
    });
  }

  reloadPracticeLinks() {
    this.loadingService.setLoaded(false);
    this.restService.getUserPracticeLinks(this.user.userId).subscribe( data => {
      console.log("LINK DATA");
      console.log(data);
      this.practiceLinks = data;
      this.loadingService.setLoaded(true);

    });
  }

  deletePatientLink(userId: number, practiceId: number, i: number) {
    if(window.confirm('Do you want to go ahead?')) {
      this.restService.deleteUserPracticeLink(userId, practiceId).subscribe((res) => {
        if(!res.error){
          this.practiceLinks.data.splice(i, 1);
        }
      })
    }
  }

  openPracticeModal(template: TemplateRef<any>, i: number) {
    this.selectedPractice = this.practiceLinks.data[i];
    this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
  }
  onCloseModal() {
    this.modalRef?.hide();
  }

  onSubmit(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  onConfirmModal() {
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
      console.log(updateResult);
      this.modalRef?.hide();
      this.messageState.next(true);
    });
  }

  onCloseToast() {
    this.messageState.next(false);
  }

  ngOnInit(): void {
    this.loadingService.setLoaded(false);

    console.log("START");
    this.sub = this.route.params.subscribe(params => {
      this.userId = +params['id'];
    });
    console.log("END");
    console.log("GET USER");

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
      this.restService.getPractices().subscribe( data => {
        this.practices = data.data;
      });
      this.restService.getUserPracticeLinks(this.userId).subscribe( data => {
        console.log("LINK DATA");
        console.log(data);
        this.practiceLinks = data;
        this.loadingService.setLoaded(true);

      });

    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
