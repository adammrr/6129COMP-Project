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
  private sub: any;

  filmId: number = 0;
  film: any;
  signedInAccountType: string = "";

  modalRef?: BsModalRef;
  messageState: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  messageStateObs: Observable<boolean> = this.messageState.asObservable();

  constructor(private route: ActivatedRoute, private router: Router,private modalService: BsModalService, public authService: AuthService, private restService: RestService, public loadingService: LoadingService, private formBuilder: FormBuilder) { }

  filmDetailsForm = this.formBuilder.group({
    filmId: '',
    filmName: '',
    genre: '',
    runTime: '',
    imageURL: '',
    filmDescription: '',
  });

  onSubmit(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  onCloseToast() {
    this.messageState.next(false);
  }

  onConfirmModal() {
    let updateDetails = {
      filmId: this.filmDetailsForm.controls['filmId'].value,
      filmName: this.filmDetailsForm.controls['filmName'].value,
      genre: this.filmDetailsForm.controls['genre'].value,
      runTime: this.filmDetailsForm.controls['runTime'].value,
      imageURL: this.filmDetailsForm.controls['imageURL'].value,
      filmDescription: this.filmDetailsForm.controls['filmDescription'].value,
    };
    this.restService.updateFilm(updateDetails).subscribe(async (updateResult: any) => {
      console.log(updateResult);
      this.modalRef?.hide();
      this.messageState.next(true);
    });
  }

  onConfirmDeleteModal() {

    this.restService.deleteFilm(this.filmId).subscribe(async (updateResult: any) => {
      console.log(updateResult);
      this.modalRef?.hide();
      this.router.navigate(["/films"])
    });
  }

  onCloseModal() {
    this.modalRef?.hide();
  }

  ngOnInit(): void {
    this.loadingService.setLoaded(false);
    this.signedInAccountType = this.authService.getAccountType();
    this.sub = this.route.params.subscribe(params => {
      console.log(params);
      this.filmId = +params['id'];
    });

    this.restService.getFilmById(this.filmId).subscribe( data => {
      this.film = data.data[0];
      console.log(this.filmId);
      console.log("film", data.data[0]);
      this.filmDetailsForm.controls['filmId'].setValue(this.film.filmId);
      this.filmDetailsForm.controls['filmName'].setValue(this.film.filmName);
      this.filmDetailsForm.controls['genre'].setValue(this.film.genre);
      this.filmDetailsForm.controls['runTime'].setValue(this.film.runTime);
      this.filmDetailsForm.controls['imageURL'].setValue(this.film.imageURL);
      this.filmDetailsForm.controls['filmDescription'].setValue(this.film.filmDescription);

      this.loadingService.setLoaded(true);
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
