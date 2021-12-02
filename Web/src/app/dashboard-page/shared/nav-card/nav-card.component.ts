import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-card',
  templateUrl: './nav-card.component.html',
  styleUrls: ['./nav-card.component.scss']
})
export class NavCardComponent implements OnInit {

  @Input() public title: string = "";
  @Input() public svg: string = "";

  constructor() {  }

  public ngOnInit(): void {
  }

}
