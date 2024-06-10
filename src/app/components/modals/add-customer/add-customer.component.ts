import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { GeneralService } from '../../../services/general.service';
import { StaffService } from '../../../services/staff.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {
  errorMessage: string = "";
  processLoading: boolean = false;
  firstName: string = "";
  lastName: string = "";
  otherName: string = "";
  email: string = "";
  phone: string = "";
  type: string = "";
  password: string = "";
  address: string = "";
  isSelectAll: boolean = false;
  permissions: any = []

  @Input() visible: boolean = false;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter();
  @Output() createdUser: EventEmitter<any> = new EventEmitter();
  constructor(
    private generalService: GeneralService,
    private staffService: StaffService,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.getAllPermissions()
  }

  ngOnChanges() {
    this.errorMessage = "";
    this.processLoading = false;
  }

  handleCancel() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  permissionCheckAll(data: any) {
    data.forEach((el: any) => {
      el.isSelected = this.isSelectAll
    });
  }

  getAllPermissions() {
    // this.settingsService.getAllPermissions().subscribe(
    //   (res: any) => {

    //     if (res.status == 'success') {
    //       this.processLoading = false;

    //       res.data.forEach((el: any) => {
    //         el.isSelected = false
    //       })

    //       this.permissions = res.data
    //       this.errorMessage = ''

    //     } else {
    //       this.processLoading = false;
    //       this.permissions = [];
    //     }
    //   },
    //   (error: any) => {
    //     this.errorMessage = 'An error occured. Please try again later';
    //     this.processLoading = false;
    //   }
    // )
  }

  createUser() {
    this.processLoading = false;

    if (this.firstName === '') {
      this.errorMessage = "First name is required";
      this.processLoading = false;
      return
    }

    if (this.lastName === '') {
      this.errorMessage = "Last name is required";
      this.processLoading = false;
      return
    }

    if (this.email === '') {
      this.errorMessage = "Email address is required";
      this.processLoading = false;
      return
    } else if (!this.generalService.validateEmailAddress(this.email)) {
      this.errorMessage = "Invalid email address provided";
      this.processLoading = false;
      return
    }

    if (this.phone === '') {
      this.errorMessage = "Phone number is required";
      this.processLoading = false;
      return
    }

    if (this.type === '') {
      this.errorMessage = "Type is required";
      this.processLoading = false;
      return
    }

    const payload = {
      firstName: this.firstName.trim(),
      surname: this.lastName,
      otherName: this.otherName.trim(),
      emailAddress: this.email.trim(),
      phoneNumber: this.phone.trim(),
      address: this.address.trim(),
      type: this.type
    }

    // this.staffService.createUser(payload).subscribe(
    //   (res: any) => {

    //     if (res.status == 'success') {
    //       this.processLoading = false;

    //       this.notification.success(res.message, '', {
    //         nzClass: 'notification1',
    //       });
    //       this.errorMessage = ''

    //       this.createdUser.emit();

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
}
