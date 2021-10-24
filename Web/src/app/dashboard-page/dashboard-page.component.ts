import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {
  id: any;

  constructor(
    private titleService: Title,
    private route: ActivatedRoute
    ) { this.titleService.setTitle("Dashboard"); }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
  }

}
