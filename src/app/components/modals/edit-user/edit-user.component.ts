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
  roles: any = [];
  rolesCopy: any = [];
  userRoles: any = [];

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
    this.getAllRoles()
  }

  ngOnChanges(changes: any) {
    this.errorMessage = "";
    this.processLoading = false;

    if (changes?.user?.currentValue.roles) {

      let userRoles = changes?.user?.currentValue.roles;

      this.userRoles = userRoles;

      userRoles = userRoles.map((el: any) => el.name);

      let roles: any = [...this.rolesCopy];

      roles.forEach((el: any) => {

        if (userRoles.includes(el.name)) {
          el.isSelected = true
        } else {
          el.isSelected = false
        }

      })

      roles = roles.sort((a: any, b: any) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)).sort((x: any, y: any) => x.isSelected == true ? -1 : y.isSelected == true ? 1 : 0)

      this.roles = roles
    }
  }

  handleCancel() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

  getAllRoles() {
    this.staffService.getAllRoles().subscribe(
      (res: any) => {

        console.log(res)

        if (res.status == 'success') {
          this.processLoading = false;

          res.data.forEach((el: any) => {

            el.isSelected = false

          })

          this.roles = res.data;
          this.rolesCopy = res.data;
          // this.roles = [...res.data].sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)).sort(function (x, y) { return x.isSelected == true ? -1 : y.isSelected == true ? 1 : 0; })
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

  permissionCheckAll(data: any) {
    data.forEach((el: any) => {
      el.isSelected = this.isSelectAll
    });
  }

  updateUser() {
    this.processLoading = false;

    const roles = this.roles.filter((el: any) => el.isSelected).map((el: any) => el.ulid)

    if (roles.length < 1) {
      this.errorMessage = "User role is required";
      this.processLoading = false;
      return
    }

    this.userRoles.forEach((el: any) => {
      const index = roles.indexOf(el.ulid);
      if (index > -1) { // only splice roles when item is found
        roles.splice(index, 1); // 2nd parameter means remove one item only
      }
    })

    const payload = {
      user_id: this.user.ulid,
      roles: roles
    }

    console.log(payload)

    this.staffService.updateUserRole(payload).subscribe(
      (res: any) => {

        if (res.status == 'success') {
          this.processLoading = false;

          this.notification.success(res.message, '', {
            nzClass: 'notification1',
          });
          this.errorMessage = ''

          this.updatedUser.emit();

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
