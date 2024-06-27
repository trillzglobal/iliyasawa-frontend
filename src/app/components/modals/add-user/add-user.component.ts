import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { GeneralService } from '../../../services/general.service';
import { StaffService } from '../../../services/staff.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  errorMessage: string = "";
  processLoading: boolean = false;
  first_name: string = "";
  last_name: string = "";
  company_name: string = "";
  email: string = "";
  phone_number: string = "";
  company_address: string = "";
  user_role: string = "";
  password: string = "";
  isSelectAll: boolean = false;
  roles: any = []

  @Input() visible: boolean = false;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter();
  @Output() createdUser: EventEmitter<any> = new EventEmitter();
  constructor(
    private generalService: GeneralService,
    private staffService: StaffService,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.getuserRole()
  }

  ngOnChanges() {
    this.errorMessage = "";
    this.processLoading = false;
  }

  handleCancel() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  roleCheckAll(data: any) {
    data.forEach((el: any) => {
      el.isSelected = this.isSelectAll
    });
  }

  roleCheck(item: any, parent: any) {
    // console.log(parent);
  }

  getuserRole() {
    this.staffService.getUserRoles().subscribe(
      (res: any) => {

        console.log(res)

        if (res.status == 'success') {
          this.processLoading = false;

          res.data.forEach((el: any) => {
            el.isSelected = false
          })

          this.roles = res.data
          this.errorMessage = ''

        } else {
          this.processLoading = false;
          this.roles = [];
        }
      },
      (error: any) => {
        this.errorMessage = 'An error occured. Please try again later';
        this.processLoading = false;
      }
    )
  }

  createUser() {
    this.processLoading = false;

    if (this.first_name === '') {
      this.errorMessage = "First name is required";
      this.processLoading = false;
      return
    }

    if (this.last_name === '') {
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

    if (this.phone_number === '') {
      this.errorMessage = "Phone number is required";
      this.processLoading = false;
      return
    }

    if (this.user_role === '') {
      this.errorMessage = "User role is required";
      this.processLoading = false;
      return
    }

    const payload = {
      first_name: this.first_name.trim(),
      surname: this.last_name,
      company_name: this.company_name.trim(),
      emailAddress: this.email.trim(),
      phoneNumber: this.phone_number.trim(),
      password: this.password.trim(),
      user_role: this.user_role.trim()
    }

    this.staffService.createUser(payload).subscribe(
      (res: any) => {

        if (res.status == 'success') {
          this.processLoading = false;

          this.notification.success(res.message, '', {
            nzClass: 'notification1',
          });
          this.errorMessage = ''

          this.createdUser.emit();

        } else {
          this.processLoading = false;
          this.notification.error(res.message, '', {
            nzClass: 'notification1',
          });
        }
      },
      (error: any) => {
        this.errorMessage = 'An error occured. Please try again later';
        this.processLoading = false;
      }
    )
  }
}
