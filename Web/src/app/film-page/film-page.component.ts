import { Component, OnInit } from '@angular/core';
import { AuthGuard } from '../services/auth.guard';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-film-page',
  templateUrl: './film-page.component.html',
  styleUrls: ['./film-page.component.scss']
})
export class FilmPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

}
