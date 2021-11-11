import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { RestService } from 'src/app/services/rest.service';

@Component({
    selector: 'app-film-list',
    templateUrl: './film-list.page.html',
    styleUrls: ['./film-list.page.scss'],
})
export class FilmListPage implements OnInit {

    public filmList = [];

    constructor(
        private restService: RestService,
        private navCtrl: NavController
    ) { }

    public ngOnInit(): void {
        this.restService.getFilms().subscribe(async (filmResult: any) => {
            this.filmList = filmResult.data;
        });
    }

    public navigateToFilmPage(filmId: number): void {
        this.navCtrl.navigateForward(`/film-list/film/${filmId}`);
    }
}
