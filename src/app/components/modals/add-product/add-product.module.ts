import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProductComponent } from './add-product.component';
import { FormsModule } from '@angular/forms';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { ErrorMessageModule } from '../../error-message/error-message.module';
import { LaddaModule } from 'angular2-ladda';



@NgModule({
  declarations: [AddProductComponent],
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
  exports: [AddProductComponent]
})
export class AddProductModule { }
