import { Component } from '@angular/core';
import { ReportService } from '../../../services/report.service';
import { ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { StoreService } from '../../../services/store.service';

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

  fetchingStore: boolean = false;
  store: Array<any> = [];
  storeStart: number = 0;
  storeStop: number = 0;
  storePage: number = 1;
  storeLimit: number = 25;
  totalStore: number = 0;
  searchStoreTerm: string = ""


  fetchingReport: boolean = false;
  reports: Array<any> = [];
  reportStart: number = 0;
  reportStop: number = 0;
  reportPage: number = 1;
  reportLimit: number = 25;
  totalReport: number = 0;
  searchTerm: string = ""


  // active 
  fetchingActive: boolean = false;
  active: Array<any> = [];
  activeStart: number = 0;
  activeStop: number = 0;
  activePage: number = 1;
  activeLimit: number = 25;
  totalActive: number = 0;
  searchActiveTerm: string = ""


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
    private storeService: StoreService
  ) {
    // this.route.queryParams.subscribe(p => {
    //   this.setTabView(p);
    // });
  }

  ngOnInit(): void {
    this.getStore()
  }

  setTabView(p: any) {
    if (p.tab == 'store') {
      this.selectedIndex = 0;
      this.getStore();
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

  searchStore() {
    this.getStore();
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

  getStore() {

    this.fetchingStore = true;

    this.storeService.getStoreProducts("FINISHED_PRODUCT").subscribe(
      async (res: any) => {
        console.log(res);
        if (res.status === "success") {
          this.fetchingStore = false;

          this.store = res.data.data
          this.totalStore = res.total;
          this.storeStart = (this.storePage - 1) * this.storeLimit;
          this.storeStop = this.storeStart + this.store.length;

        } else {

          this.errorMessage = '' + res.message;
          this.fetchingStore = false;
          this.totalStore = 0;
          this.storeStart = 0;
          this.storeStop = 0;
        }
      },
      (error: any) => {
        this.errorMessage = 'An error occured. Please try again later';
        this.fetchingStore = false;
        this.totalStore = 0;
        this.storeStart = 0;
        this.storeStop = 0;
      }
    )

    this.store = this.sample
    this.totalStore = 50;
    this.storePage = 1;

    this.fetchingStore = false;

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
