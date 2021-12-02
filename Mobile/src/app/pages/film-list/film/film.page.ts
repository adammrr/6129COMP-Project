/* eslint-disable @typescript-eslint/dot-notation */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';

@Component({
    selector: 'app-film',
    templateUrl: './film.page.html',
    styleUrls: ['./film.page.scss'],
})
export class FilmPage implements OnInit {

    public filmId: number;
    public triggers: [] = [];

    constructor(
        private route: ActivatedRoute,
        private restService: RestService
    ) { }

    public ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.filmId = params['id'];
        });

        this.restService.getFilmTriggers(this.filmId).subscribe(async (triggers) => {
            this.triggers = triggers.data;
        });
    }
}
