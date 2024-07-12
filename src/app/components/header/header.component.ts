import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GeneralService } from '../../services/general.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { StaffService } from '../../services/staff.service';

declare var Headway: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  emailVerified: boolean = true;
  environment: boolean;
  newBusinessModal: boolean = false;
  otherBusinesses: Array<any> = [];
  currentBusiness: any = {};
  currentUserRole: string = "";
  processLoading: boolean = false
  roles: Array<any> = [];
  errorMessage: string = ""


  @Input() openSideBar: boolean = false;
  @Input() currentUser: any = {};
  @Input() fetchingData: boolean = false;
  @Input() title: string = "";
  @Input() showBackButton: boolean = false;
  @Input() backUrl: string = "";
  @Input() urlQuery: any = {};
  @Output() openCompliance: EventEmitter<boolean> = new EventEmitter();
  @Output() openSideBarChange: EventEmitter<boolean> = new EventEmitter();
  constructor(
    public generalService: GeneralService,
    private authService: AuthService,
    private notification: NzNotificationService,
    private message: NzMessageService,
    private staffService: StaffService,
    private router: Router
  ) {
    this.environment = this.generalService.getEnvironment() == 'LIVE' ? true : false;
  }

  ngOnInit(): void {
    this.getAllRoles();
  }

  ngOnChanges() {

  }

  toggleSidebar() {
    this.openSideBar = !this.openSideBar;
    this.openSideBarChange.emit(this.openSideBar);
  }

  resendVerificationEmail() {

  }

  showCompliance() {
    this.openCompliance.emit(true);
  }

  changeEnvironment() {
    if (this.currentBusiness.isApproved) {
      this.environment = !this.environment;
      this.environment ? this.generalService.setEnvironment('LIVE') : this.generalService.setEnvironment('SANDBOX');

      setTimeout(() => {
        window.open('/dashboard', '_self');
      }, 100);
    }
    else {
      this.environment = false;
    }
  }


  switch(role: any) {

    const payload = {
      role: role.ulid
    }

    this.staffService.switchAccount(payload).subscribe(
      (res: any) => {
        if (res.status === "success") {
          this.processLoading = false;
          this.notification.success(
            'Role switched successful.',
            '' + (res.message ?? "Success"),
            { nzClass: 'notification1' }
          );

          this.generalService.setUserData(res.data);

          // add user data to localstorage
          this.generalService.setData('user-data', res.data);

          this.generalService.setToken(res.data.access_token);

          window.location.reload()
        } else {
          this.notification.warning(
            'Error signin successful.',
            '' + res.message,
            { nzClass: 'notification1' }
          );
          this.errorMessage = '' + res.message;
          this.processLoading = false;
        }
      },
      (error: any) => {
        this.errorMessage = 'An error occured. Please try again later';
        this.processLoading = false;
      }
    )
  }

  remove(array: any, key: any, value: any) {
    const index = array.findIndex((obj: any) => obj[key] === value);
    return index >= 0 ? [
      ...array.slice(0, index),
      ...array.slice(index + 1)
    ] : array;
  }

  getAllRoles() {
    this.staffService.getUserRoles().subscribe(
      (res: any) => {
        if (res.status == 'success') {
          this.processLoading = false;

          if (res.data.roles.length > 0) {

            const result = this.remove(res.data.roles, 'name', this.currentUser.current_role)

            this.roles = result
            return
          } else {

            this.roles = res.data.roles
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

}
