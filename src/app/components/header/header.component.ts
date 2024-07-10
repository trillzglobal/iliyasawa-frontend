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
  @Input() showBackButton: boolean = true;
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
    console.log(role)

    const payload = {
      role_id: role.ulid
    }

    this.staffService.switchAccount(payload).subscribe(
      (res: any) => {
        console.log(res)
        if (res.status === "success") {
          this.processLoading = false;
          this.notification.success(
            'Role switch successful.',
            '' + (res.message ?? "Success"),
            { nzClass: 'notification1' }
          );

          this.generalService.setUserData(res.data);

          // add user data to localstorage
          this.generalService.setData('user-data', res.data);

          console.log('token', res.data.access_token);
          this.generalService.setToken(res.data.access_token);

          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 500);
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

  getAllRoles() {
    this.staffService.getUserRoles().subscribe(
      (res: any) => {

        if (res.status == 'success') {
          this.processLoading = false;

          if (res.data.length > 0) {
            const index = res.data.indexOf(this.currentUser.current_role);
            if (index > -1) { // only splice roles when item is found
              res.data.splice(index, 1); // 2nd parameter means remove one item only
            }

          }
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

}
