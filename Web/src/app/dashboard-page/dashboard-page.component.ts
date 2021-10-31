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
  accountType: number = 0;

  constructor(
    private authService: AuthService,
    private titleService: Title,
    private route: ActivatedRoute
    ) {
      this.titleService.setTitle("Dashboard");
      this.accountType = authService.getAccountType();
    }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
  }

}
