import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { GeneralService } from '../../../services/general.service';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  fetchingData: boolean = false;
  currentUser: any = {};
  currentUserRole: string = "Support";
  emailVerified: any;
  checkStatus: string = "";
  headerTitle: string = ""
  showHeaderBackButton: boolean = false;
  totalTransfersRequiringApproval: number = 0;
  openSideBar!: boolean;
  backUrl: string = "";
  urlQuery: any = {};
  business: any = {};
  env!: string;

  constructor(
    public message: NzMessageService,
    private generalService: GeneralService,
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private location: Location
  ) {
    this.currentUser = {
      emailAddress: "admin@app.com",
      firstName: "Admin",
      lastName: "User",
    }
  }

  ngOnInit(): void {
    this.getUserData();
    this.setTitle(this.location.path());

    this.env = this.generalService.getEnvironment();
    this.location.onUrlChange(url => {
      window.scrollTo(0, 0);
      this.setTitle(url);

      this.env = this.generalService.getEnvironment();
      if (window.innerWidth <= 768) {
        this.openSideBar = false
      }

    });
  }

  underDevelopment() {
    this.message.create('error', `This page is under development. Thanks for your patience!`);
  }

  setTitle(url: string) {
    if (url === "/dashboard" || url === "/dashboard/") {
      this.headerTitle = "DASHBOARD";
      this.showHeaderBackButton = false;
      this.backUrl = "";
      this.urlQuery = {};
      this.titleService.setTitle('Dashboard | TSB Promotion System');
    }
    else if (url.includes("/dashboard/zones?") || url.includes("/dashboard/zones") && !url.includes("/dashboard/zones/")) {
      this.headerTitle = "ZONES";
      this.showHeaderBackButton = false;
      this.backUrl = "";
      this.urlQuery = {};
      this.titleService.setTitle('Zones | TSB Promotion System');
    }
    else if (url.includes("/dashboard/schools?") || url.includes("/dashboard/schools") && !url.includes("/dashboard/schools/")) {
      this.headerTitle = "SCHOOLS";
      this.showHeaderBackButton = false;
      this.backUrl = "";
      this.urlQuery = {};
      this.titleService.setTitle('Schools - Dashboard | TSB Promotion System');
    }
    else if (url.includes("/dashboard/teachers") && !url.includes("/dashboard/teachers/")) {
      this.headerTitle = "TEACHERS";
      this.showHeaderBackButton = false;
      this.backUrl = "";
      this.urlQuery = {};
      this.titleService.setTitle('Teachers | TSB Promotion System');
    }
    else if (url.includes("/dashboard/departments") && !url.includes("/dashboard/departments/")) {
      this.headerTitle = "DEPARTMENTS";
      this.showHeaderBackButton = false;
      this.backUrl = "";
      this.urlQuery = {};
      this.titleService.setTitle('Departments | TSB Promotion System');
    }
    else if (url.includes("/dashboard/staff") && !url.includes("/dashboard/staff/")) {
      this.headerTitle = "STAFF";
      this.showHeaderBackButton = false;
      this.backUrl = "";
      this.urlQuery = {};
      this.titleService.setTitle('Staff | TSB Promotion System');
    }
    else if (url === "/dashboard/settings" || url === "/dashboard/settings/") {
      this.headerTitle = "SETTINGS";
      this.showHeaderBackButton = false;
      this.backUrl = "";
      this.urlQuery = {};
      this.titleService.setTitle('Settings | TSB Promotion System');
    }
    else if (url.includes("/dashboard/settings?tab=")) {
      this.headerTitle = "SETTINGS";
      this.showHeaderBackButton = false;
      this.backUrl = "";
      this.urlQuery = {};
      this.titleService.setTitle('Settings | TSB Promotion System');
    }
    else if (url === "/dashboard/logs" || url === "/dashboard/logs/") {
      this.headerTitle = "LOGS";
      this.showHeaderBackButton = false;
      this.backUrl = "";
      this.urlQuery = {};
      this.titleService.setTitle('LOGS | TSB Promotion System');
    }
    else if (url === "/dashboard/eligibility-list" || url === "/dashboard/eligibility-list/") {
      this.headerTitle = "PROMOTION / ELIGIBLE LIST";
      this.showHeaderBackButton = false;
      this.backUrl = "";
      this.urlQuery = {};
      this.titleService.setTitle('ELIGIBLE LIST | TSB Promotion System');
    }
    else if (url === "/dashboard/brief" || url === "/dashboard/brief/") {
      this.headerTitle = "PROMOTION / BRIEF";
      this.showHeaderBackButton = false;
      this.backUrl = "";
      this.urlQuery = {};
      this.titleService.setTitle('BRIEF | TSB Promotion System');
    }
    else if (url === "/dashboard/extract" || url === "/dashboard/extract/") {
      this.headerTitle = "PROMOTION / EXTRACT";
      this.showHeaderBackButton = false;
      this.backUrl = "";
      this.urlQuery = {};
      this.titleService.setTitle('EXTRACT | TSB Promotion System');
    } else if (url === "/dashboard/notification" || url === "/dashboard/notification/") {
      this.headerTitle = "PROMOTION / NOTIFICATION";
      this.showHeaderBackButton = false;
      this.backUrl = "";
      this.urlQuery = {};
      this.titleService.setTitle('NOTIFICATION  | TSB Promotion System');
    }

  }

  async getUserData() {
    this.fetchingData = true;
    this.currentUser = await this.generalService.getUserData();

    console.log(this.currentUser);

    this.fetchingData = false;
  }
}
