import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})

export class SignInComponent implements OnInit {

  constructor(private titleService: Title, private authService: AuthService, private formBuilder: FormBuilder) { this.titleService.setTitle("Sign In"); }

  signInForm = this.formBuilder.group({
    email: '',
    password: ''
  })

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log("Sign In Clicked");
    //console.log("Email: " + this.signInForm.get("email")?.value);
    //console.log("Password: " + this.signInForm.get("password")?.value);

    this.authService.signIn(this.signInForm.get("email")?.value, this.signInForm.get("password")?.value);
  }

  signIn() {
    //TODO Add login code here
    console.log("NOT IMPLEMENTED YET");
  }
}
