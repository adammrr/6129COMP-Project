import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogSeizurePage } from './log-seizure.page';

const routes: Routes = [
    {
        path: '',
        component: LogSeizurePage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LogSeizurePageRoutingModule { }
