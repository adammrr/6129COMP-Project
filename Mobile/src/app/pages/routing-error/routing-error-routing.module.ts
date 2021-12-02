import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoutingErrorPage } from './routing-error.page';

const routes: Routes = [
    {
        path: '',
        component: RoutingErrorPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RoutingErrorPageRoutingModule { }
