import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { GeneralService } from '../../../services/general.service';
import { StaffService } from '../../../services/staff.service';
import { CustomersService } from '../../../services/customers.service';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {
  errorMessage: string = "";
  processLoading: boolean = false;
  first_name: string = "";
  last_name: string = "";
  otherName: string = "";
  email: string = "";
  phone: string = "";
  type: string = "";
  password: string = "";
  address: string = "";
  isSelectAll: boolean = false;
  permissions: any = []
  roles: any = []

  @Input() visible: boolean = false;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter();
  @Output() createdUser: EventEmitter<any> = new EventEmitter();
  constructor(
    private generalService: GeneralService,
    private staffService: StaffService,
    private notification: NzNotificationService,
    private customersService: CustomersService
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

  permissionCheckAll(data: any) {
    data.forEach((el: any) => {
      el.isSelected = this.isSelectAll
    });
  }

  getAllRoles() {
    this.staffService.getAllRoles().subscribe(
      (res: any) => {

        console.log(res)

        if (res.status == 'success') {
          this.processLoading = false;

          if (res.data.length > 0) {
            const result = res.data.filter((el: any) => el.name.toLowerCase().includes("customer"));

            this.roles = result;
          } else {
            this.roles = res.data
            this.errorMessage = ''
          }

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

    if (this.type === '') {
      this.errorMessage = "Role is required";
      this.processLoading = false;
      return
    }


    const payload = {
      firstname: this.first_name.trim(),
      lastname: this.last_name,
      email: this.email.trim(),
      roles: [this.type]
    }

    this.customersService.createUser(payload).subscribe(
      (res: any) => {

        if (res.status == 'success') {
          this.processLoading = false;
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
