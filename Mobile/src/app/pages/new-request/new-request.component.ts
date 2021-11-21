import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { ModalController, NavController } from '@ionic/angular';



@Component({
  selector: 'app-new-request',
  templateUrl: './new-request.component.html',
  styleUrls: ['./new-request.component.scss'],
})



export class NewRequestComponent implements OnInit {

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
      private authService: AuthService,
      private formBuilder: FormBuilder,
      private navCtrl: NavController,
      private modalCtrl: ModalController,
      private alert: AlertService
  ) {
      this.newFilm = this.formBuilder.group({
          filmName: '',
          genre:'',
          runtime: '',
          releaseDate: '',
          trigger:''
      });
      this.newTrigger = this.formBuilder.group({
        filmName: '',
          releaseDate: '',
          timestamp: '',
          details: '',
      })
  }
  ngOnInit() {}

  public toggleFilm(){
    this.hideFilm = !this.hideFilm;
    this.hideSpace = !this.hideSpace;
    this.hideTriggerButton = !this.hideTriggerButton;
  }

  public toggleTrigger(){
    this.hideTrigger = !this.hideTrigger;
    this.hideSpace = !this.hideSpace;
    this.hideFilmButton = !this.hideFilmButton;
  }

  public dismiss(){
    this.modalCtrl.dismiss();
  }
}
