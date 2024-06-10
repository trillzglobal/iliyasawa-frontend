import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateRangeComponent } from './date-range.component';
import { FormsModule } from '@angular/forms';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';



@NgModule({
  declarations: [
    DateRangeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NzDatePickerModule
  ],
  exports:[DateRangeComponent]
})
export class DateRangeModule { }
