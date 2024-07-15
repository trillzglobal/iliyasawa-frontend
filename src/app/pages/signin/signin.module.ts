import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './signin.component';
import { SignInRoutingModule } from './signin-routing.module';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { ErrorMessageModule } from '../../components/error-message/error-message.module';
import { LaddaModule } from 'angular2-ladda';
import { NzMessageModule } from 'ng-zorro-antd/message';


@NgModule({
  declarations: [
    SigninComponent
  ],
  imports: [
    CommonModule,
    SignInRoutingModule,
    FormsModule,
    NzMessageModule,
    NzIconModule,
    NzNotificationModule,
    ErrorMessageModule,
    LaddaModule.forRoot({
      style: "zoom-out",
      spinnerSize: 33,
      spinnerColor: "green",
      spinnerLines: 12
    }),
  ]
})
export class SigninModule { }
