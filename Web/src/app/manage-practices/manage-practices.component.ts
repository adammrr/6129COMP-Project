import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { LoadingService } from '../services/loading.service';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-manage-practices',
  templateUrl: './manage-practices.component.html',
  styleUrls: ['./manage-practices.component.scss']
})
export class ManagePracticesComponent implements OnInit {
  //Variables
  public practices: any = [];

  constructor(private restService: RestService, public loadingService: LoadingService) {  }

  //Inititialise practices from database
  public ngOnInit() {
    this.loadingService.setLoaded(false);
    this.restService.getPractices().subscribe( data => {
      this.practices = data;
      this.loadingService.setLoaded(true);
    });
  }

  //Reload the practices data
  public reloadPractices(): void {
    this.loadingService.setLoaded(false);
    this.restService.getPractices().subscribe( data => {
      this.practices = data;
      this.loadingService.setLoaded(true);
    });
  }

  //Delete a practice from its ID
  public deletePractice(id:any, i:any) {
    if(window.confirm('Do you want to go ahead?')) {
      this.restService.deletePractice(id).subscribe((res) => {
        this.practices.data.splice(i, 1);
      })
    }
  }
}
