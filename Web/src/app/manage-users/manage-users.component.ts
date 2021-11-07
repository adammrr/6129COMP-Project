import { Component, OnInit } from '@angular/core';
import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {

  patients:any = [];
  practitioners:any = [];

  constructor(private crudService: CrudService) { }
  ngOnInit(): void {

    this.crudService.GetPatients().subscribe(data => {
      console.log(data)
      this.patients = data;
    });

    this.crudService.GetPractitioners().subscribe(data => {
      console.log(data)
      this.practitioners = data;
    });
  }
  deletePatient(id:any, i:any) {
    console.log(id);
    if(window.confirm('Do you want to go ahead?')) {
      this.crudService.deleteUser(id).subscribe((res) => {
        console.log(this.patients.data);
        this.patients.data.splice(i, 1);
      })
    }
  }
  deletePractitioner(id:any, i:any) {
    console.log(id);
    if(window.confirm('Do you want to go ahead?')) {
      this.crudService.deleteUser(id).subscribe((res) => {
        console.log(this.patients.data);
        this.patients.data.splice(i, 1);
      })
    }
  }
}
