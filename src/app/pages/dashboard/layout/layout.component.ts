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
      user: {
        emailAddress: "admin@app.com",
        firstName: "Admin",
        lastName: "User",
      }
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
      this.titleService.setTitle('Dashboard | Iliyasawa');
    }
    else if (url.includes("/dashboard/outlets?") || url.includes("/dashboard/outlets") && !url.includes("/dashboard/outlets/")) {
      this.headerTitle = "Outlets";
      this.showHeaderBackButton = false;
      this.backUrl = "";
      this.urlQuery = {};
      this.titleService.setTitle('Outlets | Iliyasawa');
    }
    else if (url.includes("/dashboard/products?") || url.includes("/dashboard/products") && !url.includes("/dashboard/products/")) {
      this.headerTitle = "Products";
      this.showHeaderBackButton = false;
      this.backUrl = "";
      this.urlQuery = {};
      this.titleService.setTitle('Products - Dashboard | Iliyasawa');
    }
    else if (url.includes("/dashboard/customers") && !url.includes("/dashboard/customers/")) {
      this.headerTitle = "Customers";
      this.showHeaderBackButton = false;
      this.backUrl = "";
      this.urlQuery = {};
      this.titleService.setTitle('Customers | Iliyasawa');
    }
    else if (url.includes("/dashboard/store") && !url.includes("/dashboard/store/")) {
      this.headerTitle = "Store";
      this.showHeaderBackButton = false;
      this.backUrl = "";
      this.urlQuery = {};
      this.titleService.setTitle('Store | Iliyasawa');
    }
    else if (url.includes("/dashboard/staff") && !url.includes("/dashboard/staff/")) {
      this.headerTitle = "STAFF";
      this.showHeaderBackButton = false;
      this.backUrl = "";
      this.urlQuery = {};
      this.titleService.setTitle('Staff | Iliyasawa');
    }
    else if (url === "/dashboard/settings" || url === "/dashboard/settings/") {
      this.headerTitle = "SETTINGS";
      this.showHeaderBackButton = false;
      this.backUrl = "";
      this.urlQuery = {};
      this.titleService.setTitle('Settings | Iliyasawa');
    }
    else if (url.includes("/dashboard/settings?tab=")) {
      this.headerTitle = "SETTINGS";
      this.showHeaderBackButton = false;
      this.backUrl = "";
      this.urlQuery = {};
      this.titleService.setTitle('Settings | Iliyasawa');
    }
    else if (url === "/dashboard/logs" || url === "/dashboard/logs/") {
      this.headerTitle = "LOGS";
      this.showHeaderBackButton = false;
      this.backUrl = "";
      this.urlQuery = {};
      this.titleService.setTitle('LOGS | Iliyasawa');
    }
    else if (url === "/dashboard/notification" || url === "/dashboard/notification/") {
      this.headerTitle = "NOTIFICATION";
      this.showHeaderBackButton = false;
      this.backUrl = "";
      this.urlQuery = {};
      this.titleService.setTitle('NOTIFICATION  | Iliyasawa');
    }

  }

  async getUserData() {
    this.fetchingData = true;
    this.currentUser = await this.generalService.getUserData();
    this.fetchingData = false;
  }
}
