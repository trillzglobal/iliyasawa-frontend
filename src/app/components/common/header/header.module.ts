import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
// import { AvatarModule } from 'ngx-avatars';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzMessageModule } from 'ng-zorro-antd/message';

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NzDropDownModule,
    NzNotificationModule,
    NzMessageModule,
    NgxSkeletonLoaderModule,
    NzSwitchModule,
    NzIconModule,
    NzToolTipModule,
    // AvatarModule,
  ],
  exports: [HeaderComponent]
})
export class HeaderModule { }
