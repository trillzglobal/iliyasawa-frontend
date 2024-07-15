import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { FormsModule } from '@angular/forms';
import { LaddaModule } from 'angular2-ladda';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { ErrorMessageModule } from '../../../components/error-message/error-message.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NoResultModule } from '../../../components/common/no-result/no-result.module';
import { PaginationModule } from '../../../components/common/pagination/pagination.module';
import { AddProductModule } from '../../../components/modals/add-product/add-product.module';
import { EditProductModule } from '../../../components/modals/edit-product/edit-product.module';



@NgModule({
  declarations: [
    ProductsComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    NzIconModule,
    AddProductModule,
    EditProductModule,
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
    ProductsRoutingModule,
    NgxSkeletonLoaderModule
  ]
})
export class ProductsModule { }
