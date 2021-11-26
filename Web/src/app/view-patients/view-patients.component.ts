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
  private sub: any;
  public practiceId: number | undefined;
  public practiceName: string | undefined;
  modalRef?: BsModalRef;
  selectedPatient:any;
  public patients: any = [];

  constructor(private modalService: BsModalService, public loadingService: LoadingService, private restService: RestService, private route: ActivatedRoute, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loadingService.setLoaded(false);

    this.sub = this.route.params.subscribe(params => {
      this.practiceId = +params['id'];
    });

    if(this.authService.getAccountType() != 'practitioner'){
      this.router.navigate(['/home']);
    }
    if(this.practiceId){
      this.restService.getPracticePatients(this.practiceId).subscribe( data => {
        console.log(data);
        this.patients = data.data.patientsResults;
        console.log(this.patients);
        this.practiceName = data.data.practiceName;
        this.loadingService.setLoaded(true);
      });
    }else{
      this.loadingService.setLoaded(true);
    }

  }

  openPatientModal(template: TemplateRef<any>, i: number) {
    this.selectedPatient = this.patients[i];
    this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
  }

  onCloseModal() {
    this.modalRef?.hide();
  }

  public reloadPatients(): void {
    this.loadingService.setLoaded(false);
    this.restService.getPracticePatients(this.practiceId).subscribe( data => {
      console.log(data);
      this.patients = data.data.patientsResults;
      console.log(this.patients);
      this.practiceName = data.data.practiceName;
      this.loadingService.setLoaded(true);
    });
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
