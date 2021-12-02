import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { LoadingService } from '../services/loading.service';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-view-film',
  templateUrl: './view-film.component.html',
  styleUrls: ['./view-film.component.scss']
})
export class ViewFilmComponent implements OnInit {
  //Variables
  private sub: any;
  public filmId: number = 0;
  public film: any;
  public signedInAccountType: string = "";
  public triggers: any;
  public selectedTriggerId = 0;
  private modalRef?: BsModalRef;
  public messageState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public messageStateObs: Observable<boolean> = this.messageState.asObservable();
  public messageTriggerState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public messageTriggerStateObs: Observable<boolean> = this.messageTriggerState.asObservable();

  constructor(private route: ActivatedRoute, private router: Router,private modalService: BsModalService, public authService: AuthService, private restService: RestService, public loadingService: LoadingService, private formBuilder: FormBuilder) { }

  //Form Builder Group for film details form
  public filmDetailsForm = this.formBuilder.group({
    filmId: '',
    filmName: '',
    genre: '',
    runTime: '',
    imageURL: '',
    filmDescription: '',
  });

  //Open modal
  public onSubmit(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  //Close toast popup
  public onCloseToast() {
    this.messageState.next(false);
  }

  //Close trigger toast popup
  public onCloseTriggerToast() {
    this.messageTriggerState.next(false);
  }

  //On confirm modal update details
  public onConfirmModal() {
    let updateDetails = {
      filmId: this.filmDetailsForm.controls['filmId'].value,
      filmName: this.filmDetailsForm.controls['filmName'].value,
      genre: this.filmDetailsForm.controls['genre'].value,
      runTime: this.filmDetailsForm.controls['runTime'].value,
      imageURL: this.filmDetailsForm.controls['imageURL'].value,
      filmDescription: this.filmDetailsForm.controls['filmDescription'].value,
    };
    this.restService.updateFilm(updateDetails).subscribe(async (updateResult: any) => {
      this.modalRef?.hide();
      this.messageState.next(true);
    });
  }

  //On confirm modal delete film
  public onConfirmDeleteModal() {
    this.restService.deleteFilm(this.filmId).subscribe(async (updateResult: any) => {
      this.modalRef?.hide();
      this.router.navigate(["/films"])
    });
  }

  //On confirm modal delete trigger attatched to film
  public onConfirmTriggerDeleteModal() {
    this.restService.deleteTrigger(this.selectedTriggerId).subscribe(async (updateResult: any) => {
      this.modalRef?.hide();
      this.messageTriggerState.next(true);
    });
  }

  //Close modal
  public onCloseModal() {
    this.modalRef?.hide();
  }

  //Initialise film data and trigger data
  public ngOnInit(): void {
    this.loadingService.setLoaded(false);
    this.signedInAccountType = this.authService.getAccountType();
    this.sub = this.route.params.subscribe(params => {
      this.filmId = +params['id'];
    });

    this.restService.getFilmById(this.filmId).subscribe( data => {
      this.film = data.data[0];
      this.filmDetailsForm.controls['filmId'].setValue(this.film.filmId);
      this.filmDetailsForm.controls['filmName'].setValue(this.film.filmName);
      this.filmDetailsForm.controls['genre'].setValue(this.film.genre);
      this.filmDetailsForm.controls['runTime'].setValue(this.film.runTime);
      this.filmDetailsForm.controls['imageURL'].setValue(this.film.imageURL);
      this.filmDetailsForm.controls['filmDescription'].setValue(this.film.filmDescription);
      this.restService.getFilmTriggers(this.filmId).subscribe( data => {
        this.triggers = data.data;
        this.loadingService.setLoaded(true);
      });
    });
  }

  //Unsubscribe from subscription on destroy
  public ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
