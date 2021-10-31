import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  collapsed = true;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  signOut() {
    console.log("Signing out");
    this.authService.signOut();
  }
}
