import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResetPasswordRoutingModule } from './reset-password-routing.module';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { FormsModule } from '@angular/forms';
import { LaddaModule } from 'angular2-ladda';
import { ErrorMessageModule } from '../../components/error-message/error-message.module';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ResetPasswordComponent } from './reset-password.component';


@NgModule({
  declarations: [
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    ResetPasswordRoutingModule,
    NzNotificationModule,
    FormsModule,
    NzIconModule,
    ErrorMessageModule,
    LaddaModule.forRoot({
      style: "zoom-out",
      spinnerSize: 33,
      spinnerColor: "green",
      spinnerLines: 12
    }),
  ]
})
export class ResetPasswordModule { }
