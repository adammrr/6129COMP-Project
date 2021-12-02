import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../services/auth.guard';
import { AuthService } from '../services/auth.service';
import { LoadingService } from '../services/loading.service';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'app-film-page',
  templateUrl: './film-page.component.html',
  styleUrls: ['./film-page.component.scss']
})
export class FilmPageComponent implements OnInit {
  //Variables
  public films:any = [];
  public signedInAccountType: any;

  constructor(private authService: AuthService, private restService: RestService, public loadingService: LoadingService) { }

  //Initialises the Film Page
  public ngOnInit(): void {
    this.loadingService.setLoaded(false);
    this.signedInAccountType = this.authService.getAccountType();
    this.restService.getFilms().subscribe( data => {
      this.films = data;
      console.log(data);
      this.loadingService.setLoaded(true);
    });
  }

  //Initialises the Films List on the page
  public reloadFilms(): void {
    this.loadingService.setLoaded(false);
    this.restService.getFilms().subscribe( data => {
      this.films = data;
      console.log(data);
      this.loadingService.setLoaded(true);
    });
  }
}
