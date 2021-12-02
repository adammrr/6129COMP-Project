import { Location } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {
  //Variables
  public userId: number = 0;
  public user:any;
  public practices:any;
  public practiceLinks:any;
  public selectedPractice:any;
  public returnString: string = "";
  public messageState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public messageStateObs: Observable<boolean> = this.messageState.asObservable();
  public messageEpilepsyState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public messageEpilepsyStateObs: Observable<boolean> = this.messageState.asObservable();
  public events: any;
  public signedInAccountType: string = "";
  private sub: any;
  private modalRef?: BsModalRef;

  constructor(private location: Location, private modalService: BsModalService, private route: ActivatedRoute, public authService: AuthService, private restService: RestService, public loadingService: LoadingService, private formBuilder: FormBuilder) { }

  //Form Builder Group for user details form
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

  //Form Builder Group for user epilepsy details form
  public epilepsyDetailsForm = this.formBuilder.group({
    seizureType: '',
    frequency: '',
    yearsSuffering: '',
    triggerDetails: '',
  });

  //Form for assigning user to a practice
  public assignForm = this.formBuilder.group({
    practiceInput: ''
  });

  //Open Modal to assign user to practice
  public assignPractice(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
  }

  //Navigate to the previous page
  public previousPage() {
    this.location.back();
  }

  //On confirm modal add user to practice by userId and practiceId
  public onAssignConfirm() {
    let updateDetails = {
      userId: this.userId,
      practiceId: this.assignForm.controls['practiceInput'].value
    };
    this.restService.addPracticeLink(updateDetails).subscribe(async (updateResult: any) => {
      this.reloadPracticeLinks();
      this.modalRef?.hide();
    });
  }

  //Reload the data to show user assigned practices
  public reloadPracticeLinks() {
    this.loadingService.setLoaded(false);
    this.restService.getUserPracticeLinks(this.user.userId).subscribe( data => {
      this.practiceLinks = data;
      this.loadingService.setLoaded(true);
    });
  }

  //remove user from a practice
  public deletePatientLink(userId: number, practiceId: number, i: number) {
    if(window.confirm('Do you want to go ahead?')) {
      this.restService.deleteUserPracticeLink(userId, practiceId).subscribe((res) => {
        if(!res.error){
          this.practiceLinks.data.splice(i, 1);
        }
      });
    }
  }

  //Open details about practice in modal
  public openPracticeModal(template: TemplateRef<any>, i: number) {
    this.selectedPractice = this.practiceLinks.data[i];
    this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
  }

  //Close modal
  public onCloseModal() {
    this.modalRef?.hide();
  }

  //Open generic modal
  public onSubmit(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
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

  //update user epilepsy details on confirm from modal
  public onConfirmEpilepsyModal() {
    let updateDetails = {
      userId: this.detailsForm.controls['userId'].value,
      seizureType: this.epilepsyDetailsForm.controls['seizureType'].value,
      frequency: this.epilepsyDetailsForm.controls['frequency'].value,
      yearsSuffering: this.epilepsyDetailsForm.controls['yearsSuffering'].value,
      triggerDetails: this.epilepsyDetailsForm.controls['triggerDetails'].value,
    };
    this.restService.updateUserSeizure(updateDetails).subscribe(async (updateResult: any) => {
      this.modalRef?.hide();
      this.messageEpilepsyState.next(true);
    });
  }

  //Close popup toast
  public onCloseToast() {
    this.messageState.next(false);
  }

  //Initialise page with data for user details, user epilepsy details and practices assigned to
  public ngOnInit(): void {
    this.loadingService.setLoaded(false);
    this.signedInAccountType = this.authService.getAccountType();
    this.sub = this.route.params.subscribe(params => {
      console.log(params);
      this.userId = +params['id'];
      this.returnString = params['returnLink'];
    });

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
        this.practiceLinks = data;
      });

      this.restService.getUserEvents(this.userId).subscribe( data => {
        this.events = data.data;
        this.loadingService.setLoaded(true);
      });

      this.restService.getUserEpilepsyDetails(this.userId).subscribe( data => {
        if(data.data[0] != undefined){
          this.epilepsyDetailsForm.controls['seizureType'].setValue(data.data[0].seizureType);
          this.epilepsyDetailsForm.controls['frequency'].setValue(data.data[0].frequency);
          this.epilepsyDetailsForm.controls['yearsSuffering'].setValue(data.data[0].yearsSuffering);
          this.epilepsyDetailsForm.controls['triggerDetails'].setValue(data.data[0].triggerDetails);
        }
        this.loadingService.setLoaded(true);
      });
    });
  }

  //Unsubscribe from subscription when page destroyed
  public ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
