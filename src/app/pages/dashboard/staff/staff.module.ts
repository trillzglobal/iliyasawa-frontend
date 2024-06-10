import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaffComponent } from './staff.component';
import { StaffRoutingModule } from './staff-routing.module';
import { FormsModule } from '@angular/forms';
import { LaddaModule } from 'angular2-ladda';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { ErrorMessageModule } from '../../../components/error-message/error-message.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { PaginationModule } from '../../../components/common/pagination/pagination.module';
import { NoResultModule } from '../../../components/common/no-result/no-result.module';
import { AddUserModule } from '../../../components/modals/add-user/add-user.module';
import { EditUserModule } from '../../../components/modals/edit-user/edit-user.module';



@NgModule({
  declarations: [
    StaffComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    NzIconModule,
    AddUserModule,
    EditUserModule,
    NoResultModule,
    NzMessageModule,
    ErrorMessageModule,
    NzNotificationModule,
    LaddaModule.forRoot({
      style: "zoom-out",
      spinnerSize: 33,
      spinnerColor: "white",
      spinnerLines: 12
    }),
    PaginationModule,
    StaffRoutingModule,
    NgxSkeletonLoaderModule
  ]
})
export class StaffModule { }
