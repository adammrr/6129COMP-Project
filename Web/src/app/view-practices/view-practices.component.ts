import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AuthService } from '../services/auth.service';
import { LoadingService } from '../services/loading.service';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-view-practices',
  templateUrl: './view-practices.component.html',
  styleUrls: ['./view-practices.component.scss']
})
export class ViewPracticesComponent implements OnInit {
  //Variables
  public practiceId: number | undefined;
  public userId: number | undefined;
  private modalRef?: BsModalRef;
  public selectedPractice:any;
  public practices: any = [];

  constructor(private modalService: BsModalService, public loadingService: LoadingService, private restService: RestService, private route: ActivatedRoute, private authService: AuthService, private router: Router) { }

  //Initialise data
  public ngOnInit(): void {
    this.loadingService.setLoaded(false);
    this.userId = this.authService.getUserId();

    if(this.authService.getAccountType() != 'practitioner'){
      this.router.navigate(['/home']);
    }
    this.restService.getUserPracticeLinks(this.userId).subscribe( data => {
      this.practices = data;
      this.loadingService.setLoaded(true);
    });
  }

  //Open modal
  public openPracticeModal(template: TemplateRef<any>, i: number) {
    this.selectedPractice = this.practices.data[i];
    this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
  }

  //Close Modal
  public onCloseModal() {
    this.modalRef?.hide();
  }

  //Reload practices data
  public reloadPractices(): void {
    this.loadingService.setLoaded(false);
    this.restService.getUserPracticeLinks(this.userId).subscribe( data => {
      this.practices = data;
      this.loadingService.setLoaded(true);
    });
  }
}
