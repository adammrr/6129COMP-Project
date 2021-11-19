import { Component, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { NavController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-new-request',
  templateUrl: './new-request.component.html',
  styleUrls: ['./new-request.component.scss'],
})

@NgModule({
  imports: [
      BrowserModule /* or CommonModule */, 
      FormsModule, ReactiveFormsModule
  ]})


export class NewRequestComponent implements OnInit {

  public newFilm?: FormGroup;
  public newTrigger?: FormGroup;
  public filmDetails?;
  public triggerDetails?;

  public hideFilm = true;
  public hideTrigger = true;
  public hideSpace = false;
  
  constructor(
      private authService: AuthService,
      private formBuilder: FormBuilder,
      private navCtrl: NavController,
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
  }

  public toggleTrigger(){
    this.hideTrigger = !this.hideTrigger;
    this.hideSpace = !this.hideSpace;
  }
}
