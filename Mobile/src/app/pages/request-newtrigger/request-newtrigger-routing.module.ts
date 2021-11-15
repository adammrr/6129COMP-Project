import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequestNewtriggerPage } from './request-newtrigger.page';

const routes: Routes = [
  {
    path: '',
    component: RequestNewtriggerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestNewtriggerPageRoutingModule {}
