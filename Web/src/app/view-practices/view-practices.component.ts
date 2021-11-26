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
  public practiceId: number | undefined;
  public userId: number | undefined;
  
  modalRef?: BsModalRef;
  selectedPractice:any;
  practices: any = [];

  constructor(private modalService: BsModalService, public loadingService: LoadingService, private restService: RestService, private route: ActivatedRoute, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
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

  openPracticeModal(template: TemplateRef<any>, i: number) {
    this.selectedPractice = this.practices.data[i];
    this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
  }
  
  onCloseModal() {
    this.modalRef?.hide();
  }

  public reloadPractices(): void {
    this.loadingService.setLoaded(false);
    this.restService.getUserPracticeLinks(this.userId).subscribe( data => {
      this.practices = data;
      this.loadingService.setLoaded(true);
    });
  }
}
