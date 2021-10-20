import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FilmListPage } from './film-list.page';

const routes: Routes = [
    {
        path: '',
        component: FilmListPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class FilmListPageRoutingModule { }
