import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})

export class SignInComponent {

  constructor(private titleService: Title, private authService: AuthService, private formBuilder: FormBuilder) { this.titleService.setTitle("Sign In"); }

  //Form Builder Group for sign in form
  public signInForm = this.formBuilder.group({
    email: '',
    password: '',
    rememberMe: false
  })

  //Form submitted, uses auth service to sign in
  public onSubmit(): void {
    console.log("Sign In Clicked");
    this.authService.signIn(this.signInForm.get("email")?.value, this.signInForm.get("password")?.value, this.signInForm.get("rememberMe")?.value);
  }
}
