import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AuthService } from '../services/auth.service';
import { LoadingService } from '../services/loading.service';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-view-patients',
  templateUrl: './view-patients.component.html',
  styleUrls: ['./view-patients.component.scss']
})
export class ViewPatientsComponent implements OnInit {
  //Variables
  private sub: any;
  public practiceId: number | undefined;
  public practiceName: string | undefined;
  private modalRef?: BsModalRef;
  public selectedPatient:any;
  public patients: any = [];

  constructor(private modalService: BsModalService, public loadingService: LoadingService, private restService: RestService, private route: ActivatedRoute, private authService: AuthService, private router: Router) { }

  //Initialises data for patients assigned to this practice
  public ngOnInit(): void {
    this.loadingService.setLoaded(false);
    this.sub = this.route.params.subscribe(params => {
      this.practiceId = +params['id'];
    });

    if(this.authService.getAccountType() != 'practitioner'){
      this.router.navigate(['/home']);
    }

    if(this.practiceId){
      this.restService.getPracticePatients(this.practiceId).subscribe( data => {
        this.patients = data.data.patientsResults;
        this.practiceName = data.data.practiceName;
        this.loadingService.setLoaded(true);
      });
    }else{
      this.loadingService.setLoaded(true);
    }
  }

  //Open patient details in modal
  public openPatientModal(template: TemplateRef<any>, i: number) {
    this.selectedPatient = this.patients[i];
    this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
  }

  //Close modal
  public onCloseModal() {
    this.modalRef?.hide();
  }

  //Reload patient data
  public reloadPatients(): void {
    this.loadingService.setLoaded(false);
    this.restService.getPracticePatients(this.practiceId).subscribe( data => {
      this.patients = data.data.patientsResults;
      this.practiceName = data.data.practiceName;
      this.loadingService.setLoaded(true);
    });
  }

  //Unsubscribe from subscription on destroy
  public ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
