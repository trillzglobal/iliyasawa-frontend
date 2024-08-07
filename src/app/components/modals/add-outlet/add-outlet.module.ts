import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddOutletComponent } from './add-outlet.component';
import { FormsModule } from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ErrorMessageModule } from '../../error-message/error-message.module';
import { LaddaModule } from 'angular2-ladda';



@NgModule({
  declarations: [AddOutletComponent],
  imports: [
    CommonModule,
    FormsModule,
    NzModalModule,
    ErrorMessageModule,
    LaddaModule.forRoot({
      style: "zoom-out",
      spinnerSize: 33,
      spinnerColor: "green",
      spinnerLines: 12
    }),
  ],
  exports: [AddOutletComponent]
})
export class AddOutletModule { }
