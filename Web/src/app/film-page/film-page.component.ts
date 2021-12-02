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
  films:any = [];


  constructor(private restService: RestService, public loadingService: LoadingService) { }

  ngOnInit(): void {
    this.loadingService.setLoaded(false);

    this.restService.getFilms().subscribe( data => {
      this.films = data;
      console.log(data);
      this.loadingService.setLoaded(true);
    });
  }

  reloadFilms(): void {
    this.loadingService.setLoaded(false);

    this.restService.getFilms().subscribe( data => {
      this.films = data;
      console.log(data);
      this.loadingService.setLoaded(true);
    });
  }

  newFilm(): void {

  }
}


