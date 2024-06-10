import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { GeneralService } from '../../../services/general.service';
import { OutletService } from '../../../services/outlet.service';

@Component({
  selector: 'app-add-outlet',
  templateUrl: './add-outlet.component.html',
  styleUrls: ['./add-outlet.component.scss']
})
export class AddOutletComponent implements OnInit {
  errorMessage: string = "";
  processLoading: boolean = false;
  location: string = "";
  name: string = "";
  address: string = "";

  @Input() visible: boolean = false;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter();
  @Output() createdSchool: EventEmitter<any> = new EventEmitter();
  constructor(
    private generalService: GeneralService,
    private notification: NzNotificationService,
    private outletService: OutletService
  ) { }

  ngOnInit(): void {

  }

  submit() {
    this.processLoading = false;

    if (this.name === '') {
      this.errorMessage = "outlet name is required";
      this.processLoading = false;
      return
    }

    if (this.location === '') {
      this.errorMessage = "Location is required";
      this.processLoading = false;
      return
    }

    if (this.address === '') {
      this.errorMessage = "Address is required";
      this.processLoading = false;
      return
    }

    const payload = {
      name: this.location.trim(),
      address: this.address.trim(),
      location: this.name.trim(),
    }

    // this.outletService.createSchool(payload).subscribe(
    //   (res: any) => {

    //     if (res.status == 'success') {
    //       this.processLoading = false;

    //       this.notification.success(res.message, '', {
    //         nzClass: 'notification1',
    //       });
    //       this.errorMessage = ''
    //       this.location = '';
    //       this.name = '';
    //       this.address = '';
    //       this.createdSchool.emit();

    //     } else {
    //       this.processLoading = false;
    //       this.notification.error(res.message, '', {
    //         nzClass: 'notification1',
    //       });
    //     }
    //   },
    //   (error: any) => {
    //     this.errorMessage = 'An error occured. Please try again later';
    //     this.processLoading = false;
    //   }
    // )
  }

  ngOnChanges() {
    this.errorMessage = "";
    this.processLoading = false;
  }

  handleCancel() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}
