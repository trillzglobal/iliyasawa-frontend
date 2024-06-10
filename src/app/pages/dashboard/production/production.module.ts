import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductionComponent } from './production.component';
import { ProductionRoutingModule } from './production-routing.module';
import { FormsModule } from '@angular/forms';
import { LaddaModule } from 'angular2-ladda';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { ErrorMessageModule } from '../../../components/error-message/error-message.module';



@NgModule({
  declarations: [
    ProductionComponent
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
    ProductionRoutingModule
  ]
})
export class ProductionModule { }
