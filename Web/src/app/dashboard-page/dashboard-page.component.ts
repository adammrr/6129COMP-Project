import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {
  id: any;
  accountType: string = "";
  name: string = "";
  constructor(
    public authService: AuthService,
    private titleService: Title,
    private route: ActivatedRoute) {  }

  ngOnInit(): void {
      this.titleService.setTitle("Dashboard");
      this.accountType = this.authService.getAccountType();
      this.name = this.authService.getName();
  }
}
