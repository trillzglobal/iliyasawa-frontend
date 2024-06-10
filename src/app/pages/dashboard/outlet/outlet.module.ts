import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutletComponent } from './outlet.component';
import { OutletRoutingModule } from './outlet-routing.module';
import { FormsModule } from '@angular/forms';
import { LaddaModule } from 'angular2-ladda';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { ErrorMessageModule } from '../../../components/error-message/error-message.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NoResultModule } from '../../../components/common/no-result/no-result.module';
import { PaginationModule } from '../../../components/common/pagination/pagination.module';
import { AddOutletModule } from '../../../components/modals/add-outlet/add-outlet.module';
import { EditOutletModule } from '../../../components/modals/edit-outlet/edit-outlet.module';



@NgModule({
  declarations: [
    OutletComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    NzIconModule,
    AddOutletModule,
    EditOutletModule,
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
    OutletRoutingModule,
    NgxSkeletonLoaderModule
  ]
})
export class OutletModule { }
