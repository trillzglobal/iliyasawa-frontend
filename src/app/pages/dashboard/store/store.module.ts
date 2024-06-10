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



@NgModule({
  declarations: [
    StoreComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NzMessageModule,
    NzIconModule,
    NoResultModule,
    PaginationModule,
    NzNotificationModule,
    ErrorMessageModule,
    LaddaModule.forRoot({
      style: "zoom-out",
      spinnerSize: 33,
      spinnerColor: "white",
      spinnerLines: 12
    }),
    StoreRoutingModule,
    NgxSkeletonLoaderModule
  ]
})
export class StoreModule { }
