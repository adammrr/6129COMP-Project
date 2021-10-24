import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(private titleService: Title) { this.titleService.setTitle("Sign In"); }

  @Output() signInClicked = new EventEmitter<void>();

  ngOnInit(): void {
  }

  signIn() {
    console.log("Sign In Clicked");
    this.signInClicked.emit();
  }
}
