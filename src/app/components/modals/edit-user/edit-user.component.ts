import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { GeneralService } from '../../../services/general.service';
import { StaffService } from '../../../services/staff.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  errorMessage: string = "";
  processLoading: boolean = false;
  firstName: string = "";
  lastName: string = "";
  otherName: string = "";
  email: string = "";
  phone: string = "";
  role: string = "";

  isSelectAll: boolean = false;
  permissions: any = []

  @Input() visible: boolean = false;
  @Input() user: any = {};
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter();
  @Output() updatedUser: EventEmitter<any> = new EventEmitter();
  constructor(
    private generalService: GeneralService,
    private staffService: StaffService,
    private notification: NzNotificationService,
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

  permissionCheckAll(data: any) {
    data.forEach((el: any) => {
      el.isSelected = this.isSelectAll
    });
  }

  updateUser() {
    this.processLoading = false;

    if (this.user.firstName === '') {
      this.errorMessage = "First name is required";
      this.processLoading = false;
      return
    }

    if (this.user.lastName === '') {
      this.errorMessage = "Last name is required";
      this.processLoading = false;
      return
    }

    if (this.user.email === '') {
      this.errorMessage = "Email address is required";
      this.processLoading = false;
      return
    } else if (!this.generalService.validateEmailAddress(this.user.email)) {
      this.errorMessage = "Invalid email address provided";
      this.processLoading = false;
      return
    }

    if (this.user.phone === '') {
      this.errorMessage = "Phone number is required";
      this.processLoading = false;
      return
    }

    if (this.user.role === '') {
      this.errorMessage = "Role is required";
      this.processLoading = false;
      return
    }

    const payload = {
      firstName: this.user.firstName.trim(),
      lastName: this.user.lastName,
      otherName: this.user.otherName.trim(),
      email: this.user.email.trim(),
      phone: this.user.phone.trim(),
      role: this.user.role.trim()
    }

    // this.staffService.updateUser(payload, this.user.id).subscribe(
    //   (res: any) => {

    //     if (res.status == 'success') {
    //       this.processLoading = false;

    //       this.notification.success(res.message, '', {
    //         nzClass: 'notification1',
    //       });
    //       this.errorMessage = ''

    //       this.updatedUser.emit();

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
