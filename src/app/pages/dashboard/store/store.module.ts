import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreComponent } from './store.component';
import { StoreRoutingModule } from './store-routing.module';
import { FormsModule } from '@angular/forms';
import { LaddaModule } from 'angular2-ladda';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { ErrorMessageModule } from '../../../components/error-message/error-message.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NoResultModule } from '../../../components/common/no-result/no-result.module';
import { PaginationModule } from '../../../components/common/pagination/pagination.module';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { AddProductionModule } from '../../../components/modals/add-production/add-production.module';



@NgModule({
  declarations: [
    StoreComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NzMessageModule,
    NzTabsModule,
    NzIconModule,
    NoResultModule,
    PaginationModule,
    NzNotificationModule,
    ErrorMessageModule,
    LaddaModule.forRoot({
      style: "zoom-out",
      spinnerSize: 33,
      spinnerColor: "green",
      spinnerLines: 12
    }),
    NzPopconfirmModule,
    StoreRoutingModule,
    AddProductionModule,
    NgxSkeletonLoaderModule
  ]
})
export class StoreModule { }
