import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionDetailsComponent } from './transaction-details.component';
import { FormsModule } from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { LaddaModule } from 'angular2-ladda';
import { ErrorMessageModule } from '../../error-message/error-message.module';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [TransactionDetailsComponent],
  imports: [
    CommonModule,
    FormsModule,
    NzModalModule,
    ErrorMessageModule,
    NzSwitchModule,
    LaddaModule.forRoot({
      style: 'zoom-out',
      spinnerSize: 33,
      spinnerColor: 'white',
      spinnerLines: 12,
    }),
    NzTabsModule,
    RouterModule
  ],
  exports: [TransactionDetailsComponent],
})
export class TransactionDetailsModule { }
