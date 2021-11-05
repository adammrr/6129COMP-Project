import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserRequestsPageRoutingModule } from './user-requests-routing.module';

import { UserRequestsPage } from './user-requests.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        UserRequestsPageRoutingModule,
        SharedModule
    ],
    declarations: [UserRequestsPage]
})
export class UserRequestsPageModule { }
