import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-new-film',
  templateUrl: './new-film.component.html',
  styleUrls: ['./new-film.component.scss']
})
export class NewFilmComponent implements OnInit {

  //Variables
  private modalRef?: BsModalRef;
  public messageConfirmState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public messageConfirmStateObs: Observable<boolean> = this.messageConfirmState.asObservable();
  public messageErrorState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public messageErrorStateObs: Observable<boolean> = this.messageErrorState.asObservable();
  public errorMessage: string = "";

  constructor(public loadingService: LoadingService, private restService: RestService, private formBuilder: FormBuilder, private modalService: BsModalService) { }

  //Form Builder for new film details
  public filmDetailsForm = this.formBuilder.group({
    filmName: '',
    filmDescription: '',
    genre: '',
    runTime: '',
    imageURL: '',
  });

  //Opens relevant modal
  public onSubmit(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  //When modal confirm is clicked
  public onConfirmModal(){
    let updateDetails = {
      filmName: this.filmDetailsForm.controls['filmName'].value,
      filmDescription: this.filmDetailsForm.controls['filmDescription'].value,
      genre: this.filmDetailsForm.controls['genre'].value,
      runTime: this.filmDetailsForm.controls['runTime'].value,
      imageURL: this.filmDetailsForm.controls['imageURL'].value,

    };
    this.restService.createFilm(updateDetails).subscribe(async (updateResult: any) => {
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

  //Closes the modal
  public onDeclineModal(){
    this.modalRef?.hide();
  }

  //Closes the Confirm Popup
  public onCloseConfirmToast(){
    this.messageConfirmState.next(false);
  }

  //Closes the Error Popup
  public onCloseErrorToast(){
    this.messageErrorState.next(false);
  }

  public ngOnInit(): void {

  }
}
