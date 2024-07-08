import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcurementComponent } from './procurement.component';
import { ProcurementRoutingModule } from './procurement-routing.module';
import { FormsModule } from '@angular/forms';
import { LaddaModule } from 'angular2-ladda';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NoResultModule } from '../../../components/common/no-result/no-result.module';
import { PaginationModule } from '../../../components/common/pagination/pagination.module';
import { ErrorMessageModule } from '../../../components/error-message/error-message.module';
import { AddProcurementModule } from '../../../components/modals/add-procurement/add-procurement.module';



@NgModule({
  declarations: [
    ProcurementComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NzTabsModule,
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
    NoResultModule,
    PaginationModule,
    AddProcurementModule,
    NgxSkeletonLoaderModule,
    ProcurementRoutingModule
  ]
})
export class ProcurementModule { }
