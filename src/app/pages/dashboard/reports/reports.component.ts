import { Component } from '@angular/core';
import { ReportService } from '../../../services/report.service';
import { ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { StoreService } from '../../../services/store.service';
import { GeneralService } from '../../../services/general.service';
import { ProductionService } from '../../../services/production.service';

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

  status: string = ""

  fetchingData: boolean = false;
  currentUser: any = {};
  userRole: any = "";

  processApprove: boolean = false;
  processAccept: boolean = false;

  constructor(
    private readonly route: ActivatedRoute,
    private notification: NzNotificationService,
    private reportsService: ReportService,
    private storeService: StoreService,
    private generalService: GeneralService,
    private productionService: ProductionService
  ) {
    this.route.queryParams.subscribe(p => {
      this.setTabView(p);
    });
  }

  ngOnInit(): void {
    this.getStore()
    this.getUserData()
  }

  setTabView(p: any) {
    if (p.tab == 'store') {
      this.selectedIndex = 0;
      this.getStore();
    } else if (p.tab == 'production') {
      this.selectedIndex = 1;
      this.getReports();
    } else {
      this.selectedIndex = 0;
      this.getStore();
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

    this.productionService.getAllSalesTransaction(this.reportPage, this.status, this.searchTerm, "STORING").subscribe(
      async (res: any) => {

        if (res.status === "success") {

          this.fetchingReport = false

          this.reports = res.data.data
          this.totalReport = res.total;
          this.reportStart = (this.reportPage - 1) * this.reportLimit;
          this.reportStop = this.reportStart + this.reports.length;

        } else {

          this.errorMessage = '' + res.message;
          this.fetchingReport = false

        }
      },
      (error: any) => {
        this.errorMessage = 'An error occured. Please try again later';
        this.fetchingReport = false

      }
    )

  }

  getStore() {

    this.fetchingStore = true;

    this.storeService.getStoreProducts("FINISHED_PRODUCT").subscribe(
      async (res: any) => {

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

  async getUserData() {
    this.fetchingData = true;
    this.currentUser = await this.generalService.getUserData();
    this.userRole = this.currentUser.current_role;
    this.fetchingData = false;
  }

  accept(id: string) {
    console.log(id)
    if (this.processAccept) return

    this.processAccept = true
    this.generalService.acceptTransaction(id).subscribe(
      async (res: any) => {

        this.processAccept = false
        if (res.status === "success") {

          this.notification.success(res.message, '', {
            nzClass: 'notification1',
          });

        } else {

          this.errorMessage = '' + res.message;

          this.notification.error(res.message, '', {
            nzClass: 'notification1',
          });

        }
      },
      (error: any) => {
        this.errorMessage = 'An error occured. Please try again later';

        this.processAccept = false;
      }
    )
  }

  cancelAccept() {

  }

  approve(id: string) {
    console.log(id)
    if (this.processApprove) return

    this.processApprove = true
    this.generalService.approveTransaction(id).subscribe(
      async (res: any) => {

        this.processApprove = false

        if (res.status === "success") {

          this.notification.success(res.message, '', {
            nzClass: 'notification1',
          });

        } else {

          this.notification.error(res.message, '', {
            nzClass: 'notification1',
          });

          this.errorMessage = '' + res.message;

        }
      },
      (error: any) => {
        this.errorMessage = 'An error occured. Please try again later';
        this.processApprove = false;
      }
    )
  }
}
