import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FilmListPageRoutingModule } from './film-list-routing.module';
import { FilmListPage } from './film-list.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        FilmListPageRoutingModule,
        SharedModule
    ],
    declarations: [FilmListPage]
})
export class FilmListPageModule { }
