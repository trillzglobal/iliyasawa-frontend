import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsLetterComponent } from './news-letter.component';



@NgModule({
  declarations: [
    NewsLetterComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [NewsLetterComponent]
})
export class NewsLetterModule { }
