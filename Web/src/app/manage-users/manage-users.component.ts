import { Component, OnInit, TemplateRef } from '@angular/core';
import { LoadingService } from '../services/loading.service';
import { RestService } from '../services/rest.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ActivatedRoute,  } from '@angular/router';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {
  //Variables
  public patients:any = [];
  public practitioners:any = [];
  public activeTab: string = 'patients';
  private modalRef?: BsModalRef;

  constructor(private restService: RestService, public loadingService: LoadingService, public route: ActivatedRoute) { }

  //Initialise page, load patient and practitioner data
  ngOnInit(): void {
    this.loadingService.setLoaded(false);
    this.restService.getPatients().subscribe(data => {
      this.patients = data;
      this.restService.getPractitioners().subscribe(data => {
        this.practitioners = data;
        this.loadingService.setLoaded(true);
      });
    });
  }

  //Reload the patient data
  public reloadPatients(): void {
    this.loadingService.setLoaded(false);
    this.restService.getPatients().subscribe( data => {
      this.patients = data;
      this.loadingService.setLoaded(true);
    });
  }

  //Reload the practitioner data
  public reloadPractitioners(): void {
    this.loadingService.setLoaded(false);
    this.restService.getPractitioners().subscribe( data => {
      this.practitioners = data;
      this.loadingService.setLoaded(true);
    });
  }

  //Switch the tab to dynamically show a different part of page.
  public changeTab(tab: string){
    this.activeTab = tab;
  }

  //Delete a patient from its ID
  public deletePatient(id:any, i:any) {
    console.log(id);
    if(window.confirm('Do you want to go ahead?')) {
      this.restService.deleteUser(id).subscribe((res) => {
        this.patients.data.splice(i, 1);
      })
    }
  }

  //Delete a practitioner from its ID
  public deletePractitioner(id:any, i:any) {
    console.log(id);
    if(window.confirm('Do you want to go ahead?')) {
      this.restService.deleteUser(id).subscribe((res) => {
        this.practitioners.data.splice(i, 1);
      })
    }
  }
}
