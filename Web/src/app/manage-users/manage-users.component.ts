import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../services/loading.service';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {

  patients:any = [];
  practitioners:any = [];

  constructor(private restService: RestService, public loadingService: LoadingService) { }
  ngOnInit(): void {
    console.log("LOADING ON");
    this.loadingService.setLoaded(false);

    this.restService.GetPatients().subscribe(data => {
      console.log(data)
      this.patients = data;

      this.restService.GetPractitioners().subscribe(data => {
        console.log(data)
        this.practitioners = data;
        this.loadingService.setLoaded(true);
        console.log("LOADING OFF");
      });
    });


  }
  deletePatient(id:any, i:any) {
    console.log(id);
    if(window.confirm('Do you want to go ahead?')) {
      this.restService.deleteUser(id).subscribe((res) => {
        console.log(this.patients.data);
        this.patients.data.splice(i, 1);
      })
    }
  }
  deletePractitioner(id:any, i:any) {
    console.log(id);
    if(window.confirm('Do you want to go ahead?')) {
      this.restService.deleteUser(id).subscribe((res) => {
        console.log(this.patients.data);
        this.patients.data.splice(i, 1);
      })
    }
  }
}
