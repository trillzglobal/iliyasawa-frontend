import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesComponent } from './sales.component';
import { SalesRoutingModule } from './sales-routing.module';
import { FormsModule } from '@angular/forms';
import { LaddaModule } from 'angular2-ladda';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { ErrorMessageModule } from '../../../components/error-message/error-message.module';



@NgModule({
  declarations: [
    SalesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NzMessageModule,
    NzIconModule,
    NzNotificationModule,
    ErrorMessageModule,
    LaddaModule.forRoot({
      style: "zoom-out",
      spinnerSize: 33,
      spinnerColor: "white",
      spinnerLines: 12
    }),
    SalesRoutingModule
  ]
})
export class SalesModule { }
