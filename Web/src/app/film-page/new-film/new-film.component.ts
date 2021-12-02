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

  modalRef?: BsModalRef;

  messageConfirmState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  messageConfirmStateObs: Observable<boolean> = this.messageConfirmState.asObservable();

  messageErrorState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  messageErrorStateObs: Observable<boolean> = this.messageErrorState.asObservable();
  errorMessage: string = "";

  constructor(private route: ActivatedRoute, public loadingService: LoadingService, private restService: RestService, private formBuilder: FormBuilder, private modalService: BsModalService) { }

  filmDetailsForm = this.formBuilder.group({
    filmName: '',
    filmDescription: '',
    genre: '',
    runTime: '',
    imageURL: '',

  });

  onSubmit(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  onConfirmModal(){
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

  ngOnDestroy() {
  }

}
