import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(private titleService: Title, private authService: AuthService) { this.titleService.setTitle("Sign In"); }

  ngOnInit(): void {
  }

  signIn(accountType:number) {
    console.log("Sign In Clicked");
    this.authService.signIn(accountType);
  }
}
