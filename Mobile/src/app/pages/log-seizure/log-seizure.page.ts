import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { RestService } from 'src/app/services/rest.service';

@Component({
    selector: 'app-log-seizure',
    templateUrl: './log-seizure.page.html',
    styleUrls: ['./log-seizure.page.scss'],
})
export class LogSeizurePage implements OnInit {

    newSiezure?: FormGroup;
    siezureDeatails;

    filmList =[];
    triggerList =[];

    triggers =[];

    public film;
    public hide = true;

    constructor(
        private restService: RestService,
        private formBuilder: FormBuilder,
    ) {
        this.newSiezure = this.formBuilder.group({
        film: '',
        triggers: '',
        details: ''
      }); }

    public ngOnInit(): void {
        this.restService.getFilms().subscribe(async (filmResult: any) => {
            this.filmList = filmResult.data;
          });
          this.restService.getTriggers().subscribe(async (filmResult: any) => {
            this.filmList = filmResult.data;
          });
    }

    public findTriggers(): void{
        this.hide = !this.hide;
        for (let tIndex = 0; tIndex < this.triggerList.length; tIndex++) {
            for (let fIndex = 0; fIndex < this.filmList.length; fIndex++) {
                if (this.triggerList[tIndex].filmId === this.filmList[fIndex].filmId){
                    this.triggers.push(this.triggerList[tIndex])
                }
            }
        }
    }

}
