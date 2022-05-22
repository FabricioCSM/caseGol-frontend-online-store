import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgxLoadingModule } from 'ngx-loading';
import { ModalLoginComponent } from '../modal/modal-login/modal-login.component';
import { ModalCustomerServiceComponent } from '../modal/modal-customer-service/modal-customer-service.component';
import { ModalLogoffComponent } from './modal-logoff/modal-logoff.component';



@NgModule({
  declarations: [ModalCustomerServiceComponent, ModalLoginComponent, ModalLogoffComponent],
  imports: [
    CommonModule,
    NgxLoadingModule.forRoot({}),
    FormsModule,
  ],
  exports: [ModalCustomerServiceComponent, ModalLoginComponent, ModalLogoffComponent]
})
export class ModalModule { }
