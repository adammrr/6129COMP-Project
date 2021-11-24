import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { RestService } from 'src/app/services/rest.service';

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.page.html',
  styleUrls: ['./create-request.page.scss'],
})
export class CreateRequestPage implements OnInit {
  public filmList = [];
  public user: any;
  public newFilm?: FormGroup;
  public newTrigger?: FormGroup;
  public filmDetails?;
  public triggerDetails?;
  public hideFilm = true;
  public hideFilmButton = false;
  public hideTrigger = true;
  public hideTriggerButton = false;
  public hideSpace = false;

  constructor(
    private formBuilder: FormBuilder,
    private restService: RestService,
    private authService: AuthService,
    private alert: AlertService
  ) {
    this.newFilm = this.formBuilder.group({
      filmName: '',
      filmDesc: '',
      genre: '',
      runtime: '',
    });
    this.newTrigger = this.formBuilder.group({
      film: '',
      timestamp: '',
      details: '',
    });
  }
  public ngOnInit(): void {
    this.restService.getFilms().subscribe(async (filmResult: any) => {
      this.filmList = filmResult.data;
    });
    this.user = this.authService.getLoggedInUser();
    console.log(this.user.userId);
  }

  public toggleFilm() {
    this.hideFilm = !this.hideFilm;
    this.hideSpace = !this.hideSpace;
    this.hideTriggerButton = !this.hideTriggerButton;
  }

  public toggleTrigger() {
    this.hideTrigger = !this.hideTrigger;
    this.hideSpace = !this.hideSpace;
    this.hideFilmButton = !this.hideFilmButton;
  }

  public submitFilm(): void {
    const formValues = this.newFilm.value;
    this.filmDetails = {
      filmName: formValues.filmName,
      filmDesc: formValues.filmDesc,
      genre: formValues.genre,
      runtime: formValues.runtime
    };
    console.log(this.user.userId);
    this.restService.newFilmRequest(this.user.userId, this.filmDetails).subscribe(async (result: any) => {
    });
    console.log(this.filmDetails);
    this.alert.presentToast('New film request submitted');
    console.log(this.user.userId);
    console.log("Button pressed");
  }

  public submitTrigger(): void {
    const formValues = this.newTrigger.value;
    this.triggerDetails = {
      film: formValues.film,
      timestamp: formValues.timestamp,
      details: formValues.details
    };
    console.log(this.user.userId);
    this.restService.newTriggerRequest(this.user.userId, this.triggerDetails).subscribe(async (result: any) => {
    });
    console.log(this.triggerDetails);
    this.alert.presentToast('New film request submitted');
    console.log(this.user.userId);
    console.log("Button pressed");
  }
}