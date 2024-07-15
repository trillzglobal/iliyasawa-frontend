import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddUserComponent } from './add-user.component';
import { FormsModule } from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ErrorMessageModule } from '../../error-message/error-message.module';
import { LaddaModule } from 'angular2-ladda';
import { NzIconModule } from 'ng-zorro-antd/icon';



@NgModule({
  declarations: [AddUserComponent],
  imports: [
    FormsModule,
    NzIconModule,
    CommonModule,
    NzModalModule,
    ErrorMessageModule,
    LaddaModule.forRoot({
      style: "zoom-out",
      spinnerSize: 33,
      spinnerColor: "green",
      spinnerLines: 12
    }),
  ],
  exports: [AddUserComponent]
})
export class AddUserModule { }
