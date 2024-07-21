import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GeneralService } from '../../../services/general.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.scss'],
})
export class TransactionDetailsComponent implements OnInit {
  email: string = '';
  errorMessage: string = '';
  processLoading: boolean = false;


  @Input() title: string = "";
  @Input() transaction: any = {};
  @Input() visible: boolean = false;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter();
  // @Output() updatedUser: EventEmitter<any> = new EventEmitter();

  constructor(
    private generalService: GeneralService,
    private notification: NzNotificationService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  ngOnChanges(changes: any): void {

    // console.log(changes.user)

  }

  handleCancel(): void {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  optionSelected(event: any) {
    // console.log(event);
  }

  updateDataCache(): void {

  }

}
