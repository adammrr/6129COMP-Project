import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequestNewfilmPage } from './request-newfilm.page';

const routes: Routes = [
  {
    path: '',
    component: RequestNewfilmPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestNewfilmPageRoutingModule {}
