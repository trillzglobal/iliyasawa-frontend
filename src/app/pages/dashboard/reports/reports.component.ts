import { Component } from '@angular/core';
import { ReportService } from '../../../services/report.service';
import { ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent {
  errorMessage: string = "";
  isLoading: boolean = false;
  selectedIndex: number = 0;

  fromDate: any = "";
  toDate: any = "";

  selectedReport: any = {};
  showAddModal: boolean = false;
  showEditModal: boolean = false;

  // active doctors
  fetchingReport: boolean = false;
  reports: Array<any> = [];
  reportStart: number = 0;
  reportStop: number = 0;
  reportPage: number = 1;
  reportLimit: number = 25;
  totalReport: number = 0;
  searchTerm: string = ""


  // active doctors
  fetchingActive: boolean = false;
  active: Array<any> = [];
  activeStart: number = 0;
  activeStop: number = 0;
  activePage: number = 1;
  activeLimit: number = 25;
  totalActive: number = 0;
  searchActiveTerm: string = ""

  // blocked doctors
  fetchingBlocked: boolean = false;
  blocked: Array<any> = [];
  blockedStart: number = 0;
  blockedStop: number = 0;
  blockedPage: number = 1;
  blockedLimit: number = 25;
  totalBlocked: number = 0;
  searchBlockedTerm: string = ""

  // doctors requests
  fetchingRequests: boolean = false;
  requests: Array<any> = [];
  requestsStart: number = 0;
  requestsStop: number = 0;
  requestsPage: number = 1;
  requestsLimit: number = 25;
  totalRequests: number = 0;
  searchRequestTerm: string = ""

  sample = [
    {
      "_id": "6600981563d8474d278f8920",
      "firstName": "Umar",
      "surname": "Farooq",
      "otherName": "",
      "emailAddress": "umaryusufkd@gmail.com",
      "emailAddressVerified": false,
      "phoneNumber": "+2348066249688",
      "gender": "Male",
      "role": "Sales Manager",
      "address": {
        "street": "123 Main Road",
        "city": "Barnawa",
        "state": "Kaduna",
        "country": "Nigeria",
        "zipCode": "800232",
        "_id": "6600981563d8474d278f8921"
      },
      "isBlocked": false,
      "status": "Active",
      "isDeleted": false,
      "createdAt": "2024-03-24T21:16:05.669Z",
      "updatedAt": "2024-04-07T21:22:42.883Z",
      "__v": 0,
      "approvedAt": "2024-04-07T21:21:04.415Z",
      "createdBy": {
        "firstName": "Super",
        "surname": "Admin",
        "otherName": "",
        "emailAddress": "admin@healmemedconsult.org",
        "gender": "Male",
        "role": "SUPER_ADMIN",
      }
    },
    {
      "_id": "6600981563d8474d278f8920",
      "firstName": "Jane Smith",
      "surname": "Faroow",
      "otherName": "",
      "emailAddress": "janesmith@gmail.com",
      "emailAddressVerified": false,
      "phoneNumber": "+2348066249681",
      "gender": "Male",
      "role": "Production Manager",
      "address": {
        "street": "123 Main Road",
        "city": "Barnawa",
        "state": "Kaduna",
        "country": "Nigeria",
        "zipCode": "800232",
        "_id": "6600981563d8474d278f8921"
      },
      "isBlocked": false,
      "status": "Active",
      "isDeleted": false,
      "createdAt": "2024-03-24T21:16:05.669Z",
      "updatedAt": "2024-04-07T21:22:42.883Z",
      "__v": 0,
      "approvedAt": "2024-04-07T21:21:04.415Z",
      "createdBy": {
        "firstName": "Super",
        "surname": "Admin",
        "otherName": "",
        "emailAddress": "admin@healmemedconsult.org",
        "gender": "Male",
        "role": "SUPER_ADMIN",
      }
    },
    {
      "_id": "6600981563d8474d278f8920",
      "firstName": "Albert",
      "surname": "Brown",
      "otherName": "",
      "emailAddress": "albertbrown@gmail.com",
      "emailAddressVerified": false,
      "phoneNumber": "+2348066249622",
      "gender": "Male",
      "role": "Admin",
      "address": {
        "street": "123 Main Road",
        "city": "Barnawa",
        "state": "Kaduna",
        "country": "Nigeria",
        "zipCode": "800232",
        "_id": "6600981563d8474d278f8921"
      },
      "isBlocked": false,
      "status": "Active",
      "isDeleted": false,
      "createdAt": "2024-03-24T21:16:05.669Z",
      "updatedAt": "2024-04-07T21:22:42.883Z",
      "__v": 0,
      "approvedAt": "2024-04-07T21:21:04.415Z",
      "createdBy": {
        "firstName": "Super",
        "surname": "Admin",
        "otherName": "",
        "emailAddress": "admin@healmemedconsult.org",
        "gender": "Male",
        "role": "SUPER_ADMIN",
      }
    }
  ]

  constructor(
    private readonly route: ActivatedRoute,
    private notification: NzNotificationService,
    private reportsService: ReportService,
  ) {
    // this.route.queryParams.subscribe(p => {
    //   this.setTabView(p);
    // });
  }

  ngOnInit(): void {
    this.getReports()
  }

  setTabView(p: any) {
    if (p.tab == 'sales') {
      this.selectedIndex = 0;
      this.getReports();
    } else if (p.tab == 'production') {
      this.selectedIndex = 1;
      this.getReports();
    } else if (p.tab == 'income') {
      this.selectedIndex = 2;
      this.getReports();
    } else {
      this.selectedIndex = 0;
      this.getReports();
    }
  }


  search() {

    this.getReports()

  }


  getReports() {

    this.fetchingReport = true;

    // this.reportsService.getAllOutlet(this.reportPage - 1, this.reportLimit, 'active', this.searchTerm, this.fromDate, this.toDate).subscribe(
    //   async (res: any) => {
    //     // console.log(res);
    //     if (res.statusCode === 200) {
    //       this.fetchingReport = false;

    //       this.notification.success(
    //         res.message,
    //         "",
    //         { nzClass: 'notification1' }
    //       );

    //       this.reports = res.data
    //       this.totalReport = res.pagination.total;
    //       this.reportStart = (this.reportPage - 1) * this.reportLimit;
    //       this.reportStop = this.reportStart + this.reports.length;

    //     } else {
    //       this.notification.success(
    //         res.message,
    //         "",
    //         { nzClass: 'notification1' }
    //       );
    //       this.errorMessage = '' + res.message;
    //       this.fetchingReport = false;
    //       this.totalReport = 0;
    //       this.reportStart = 0;
    //       this.reportStop = 0;
    //     }
    //   },
    //   (error: any) => {
    //     this.errorMessage = 'An error occured. Please try again later';
    //     this.fetchingReport = false;
    //     this.totalReport = 0;
    //     this.reportStart = 0;
    //     this.reportStop = 0;
    //   }
    // )

    this.reports = this.sample
    this.totalReport = 50;
    this.reportPage = 1;

    this.fetchingReport = false;

  }

  toggleAddModal() {
    this.showAddModal = !this.showAddModal;
  }

  toggleEditModal() {
    this.showEditModal = !this.showEditModal;
  }

  refreshList() {
    this.reportPage = 1;

    this.getReports()
  }

  editStore(data: any) {
    this.selectedReport = data;

    this.toggleEditModal();
  }

  onCreated() {

  }

  onUpdated() {

  }
}
