import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.scss']
})
export class SignOutComponent implements OnInit {
  public countdown = 10;

  constructor(private titleService: Title, private authService: AuthService, private router: Router) { this.titleService.setTitle("Signed Out"); }

  timer:any;

  ngOnInit(): void {
    this.authService.signOut();

    this.countdown = 5;
    this.timer = setInterval( () => {
      if(this.countdown > 0){
        this.countdown--;

      }else{
        this.router.navigate(['']);
      }

    }, 1000);
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

}
