import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersComponent } from './customers.component';
import { CustomersRoutingModule } from './customers-routing.module';
import { FormsModule } from '@angular/forms';
import { LaddaModule } from 'angular2-ladda';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { ErrorMessageModule } from '../../../components/error-message/error-message.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NoResultModule } from '../../../components/common/no-result/no-result.module';
import { PaginationModule } from '../../../components/common/pagination/pagination.module';
import { AddCustomerModule } from '../../../components/modals/add-customer/add-customer.module';
import { EditCustomerModule } from '../../../components/modals/edit-customer/edit-customer.module';



@NgModule({
  declarations: [
    CustomersComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    NzIconModule,
    AddCustomerModule,
    EditCustomerModule,
    NoResultModule,
    NzMessageModule,
    ErrorMessageModule,
    NzNotificationModule,
    LaddaModule.forRoot({
      style: "zoom-out",
      spinnerSize: 33,
      spinnerColor: "green",
      spinnerLines: 12
    }),
    PaginationModule,
    CustomersRoutingModule,
    NgxSkeletonLoaderModule
  ]
})
export class CustomersModule { }
