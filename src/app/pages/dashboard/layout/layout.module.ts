import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { FormsModule } from '@angular/forms';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { HeaderModule } from '../../../components/header/header.module';
import { LayoutRoutingModule } from './layout-routing.module';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';


@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    FormsModule,
    HeaderModule,
    CommonModule,
    NzMenuModule,
    NzMessageModule,
    NzCollapseModule,
    LayoutRoutingModule,
    NgxSkeletonLoaderModule,
  ]
})
export class LayoutModule { }
