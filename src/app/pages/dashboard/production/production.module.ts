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
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NoResultModule } from '../../../components/common/no-result/no-result.module';
import { PaginationModule } from '../../../components/common/pagination/pagination.module';
import { AddProductionModule } from '../../../components/modals/add-production/add-production.module';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { TransactionDetailsModule } from '../../../components/modals/transaction-details/transaction-details.module';
import { AddProductionDetailsModule } from '../../../components/modals/add-production-details/add-production-details.module';


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
      spinnerColor: "green",
      spinnerLines: 12
    }),
    ProductionRoutingModule,
    NzTabsModule,
    NoResultModule,
    NzPopconfirmModule,
    PaginationModule,
    AddProductionModule,
    NgxSkeletonLoaderModule,
    TransactionDetailsModule,
    AddProductionDetailsModule
  ]
})
export class ProductionModule { }
