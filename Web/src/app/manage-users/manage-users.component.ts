import { Component, OnInit, TemplateRef } from '@angular/core';
import { LoadingService } from '../services/loading.service';
import { RestService } from '../services/rest.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {

  patients:any = [];
  practitioners:any = [];
  activeTab: string = 'patients';
  modalRef?: BsModalRef;

  constructor(private restService: RestService, public loadingService: LoadingService) { }

  ngOnInit(): void {
    console.log("LOADING ON");
    this.loadingService.setLoaded(false);

    this.restService.getPatients().subscribe(data => {
      console.log(data)
      this.patients = data;
      this.restService.getPractitioners().subscribe(data => {
        console.log(data)
        this.practitioners = data;
        this.loadingService.setLoaded(true);
        console.log("LOADING OFF");
      });
    });
  }

  public reloadPatients(): void {
    this.loadingService.setLoaded(false);
    this.restService.getPatients().subscribe( data => {
      this.patients = data;
      this.loadingService.setLoaded(true);
    });
  }

  public reloadPractitioners(): void {
    this.loadingService.setLoaded(false);
    this.restService.getPractitioners().subscribe( data => {
      this.practitioners = data;
      this.loadingService.setLoaded(true);
    });
  }

  public changeTab(tab: string){
    this.activeTab = tab;

  }

  public deletePatient(id:any, i:any) {
    console.log(id);
    if(window.confirm('Do you want to go ahead?')) {
      this.restService.deleteUser(id).subscribe((res) => {
        this.patients.data.splice(i, 1);
      })
    }
  }

  public deletePractitioner(id:any, i:any) {
    console.log(id);
    if(window.confirm('Do you want to go ahead?')) {
      this.restService.deleteUser(id).subscribe((res) => {
        this.practitioners.data.splice(i, 1);
      })
    }
  }

}
