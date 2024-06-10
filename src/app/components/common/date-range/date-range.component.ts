import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss']
})
export class DateRangeComponent implements OnInit {
  formatedFromDate: any = "";
  formatedToDate: any = "";
  @Input() fromDate: Date = new Date();
  @Output() fromDateChange: EventEmitter<any> = new EventEmitter()
  @Input() toDate: Date = new Date();
  @Output() toDateChange: EventEmitter<any> = new EventEmitter()
  @Output() dateChange: EventEmitter<any> = new EventEmitter()
  constructor() {
    
  }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.formatedFromDate = new Date(this.fromDate).toDateString();
    this.formatedToDate = new Date(this.toDate).toDateString();
  }

  dateChanged(event: any, type: string) {
    if (type === 'fromDate') {
      this.formatedFromDate = event.toDateString() || new Date().toDateString();
      this.fromDateChange.emit(this.fromDate);
    }
    else {
      this.formatedToDate = event.toDateString() || new Date().toDateString();
      this.toDateChange.emit(this.toDate);
    }
    this.dateChange.emit();
  }

}
