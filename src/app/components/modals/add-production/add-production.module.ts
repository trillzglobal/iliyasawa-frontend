import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProductionComponent } from './add-production.component';
import { FormsModule } from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ErrorMessageModule } from '../../error-message/error-message.module';
import { LaddaModule } from 'angular2-ladda';
import { NzIconModule } from 'ng-zorro-antd/icon';



@NgModule({
  declarations: [AddProductionComponent],
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
  exports: [AddProductionComponent]
})
export class AddProductionModule { }
