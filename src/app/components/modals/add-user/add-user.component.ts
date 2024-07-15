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
  processReset: boolean = false

  @Input() visible: boolean = false;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter();
  @Output() createdUser: EventEmitter<any> = new EventEmitter();
  constructor(
    private generalService: GeneralService,
    private staffService: StaffService,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
    this.getAllRoles()
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

  getAllRoles() {
    this.staffService.getAllRoles().subscribe(
      (res: any) => {

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
    this.processLoading = true;

    if (this.first_name === '') {
      this.errorMessage = "First name is required";
      this.processLoading = false;
      return
    } else {
      this.errorMessage = "";
    }

    if (this.last_name === '') {
      this.errorMessage = "Last name is required";
      this.processLoading = false;
      return
    } else {
      this.errorMessage = "";
    }

    if (this.email === '') {
      this.errorMessage = "Email address is required";
      this.processLoading = false;
      return
    } else if (!this.generalService.validateEmailAddress(this.email)) {
      this.errorMessage = "Invalid email address";
      this.processLoading = false;
      return
    } else {
      this.errorMessage = "";
    }

    const roles = this.roles.filter((el: any) => el.isSelected).map((el: any) => el.ulid)

    if (roles.length < 1) {
      this.errorMessage = "User role is required";
      this.processLoading = false;
      return
    }

    const payload = {
      firstname: this.first_name.trim(),
      lastname: this.last_name,
      email: this.email.trim(),
      roles: roles
    }

    this.staffService.createUser(payload).subscribe(
      (res: any) => {

        if (res.status == 'success') {
          this.processLoading = false;

          this.notification.success(res.message, '', {
            nzClass: 'notification1',
          });
          this.errorMessage = ''
          this.first_name = "";
          this.last_name = "";
          this.email = ""
          this.roles.forEach((el: any) => {
            el.isSelected = false;
          })

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
