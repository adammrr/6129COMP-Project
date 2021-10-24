import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  collapsed = true;

  @Output() signOutClicked = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  signOut() {
    console.log("Signing out");
    this.signOutClicked.emit();
  }
}
