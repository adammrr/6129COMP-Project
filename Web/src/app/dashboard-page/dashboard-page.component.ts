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
  //Variables
  public accountType: string = "";
  public name: string = "";
  constructor(public authService: AuthService, private titleService: Title, private route: ActivatedRoute) {  }

  //Sets up the page with welcome message to user.
  public ngOnInit(): void {
      this.titleService.setTitle("Dashboard");
      this.accountType = this.authService.getAccountType();
      this.name = this.authService.getName();
  }
}
