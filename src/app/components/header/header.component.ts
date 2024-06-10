import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GeneralService } from '../../services/general.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';

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
    private router: Router
  ) {
    this.environment = this.generalService.getEnvironment() == 'LIVE' ? true : false;
  }

  ngOnInit(): void {
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



}
