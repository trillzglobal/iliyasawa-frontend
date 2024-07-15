import { Component } from '@angular/core';
import { ProductionService } from '../../../services/production.service';
import { ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { GeneralService } from '../../../services/general.service';

@Component({
  selector: 'app-production',
  templateUrl: './production.component.html',
  styleUrl: './production.component.scss'
})
export class ProductionComponent {
  errorMessage: string = "";
  isLoading: boolean = false;
  selectedIndex: number = 0;

  fromDate: any = "";
  toDate: any = "";

  selectedProduction: any = {};
  showAddModal: boolean = false;
  showEditModal: boolean = false;

  fetchingProduction: boolean = false;
  production: Array<any> = [];
  productionStart: number = 0;
  productionStop: number = 0;
  productionPage: number = 1;
  productionLimit: number = 25;
  totalProduction: number = 0;
  searchTerm: string = ""

  fetchingReport: boolean = false;
  reports: Array<any> = [];
  reportStart: number = 0;
  reportStop: number = 0;
  reportPage: number = 1;
  reportLimit: number = 25;
  totalReport: number = 0;
  searchTermReport: string = ""
  tab: string = "production"
  status: string = ""

  fetchingData: boolean = false;
  currentUser: any = {};
  userRole: any = "";

  processApprove: boolean = false;
  processAccept: boolean = false;


  constructor(
    private readonly route: ActivatedRoute,
    private notification: NzNotificationService,
    private productionService: ProductionService,
    private generalService: GeneralService,
  ) {
    this.route.queryParams.subscribe(p => {
      this.setTabView(p);
    });
  }

  ngOnInit(): void {
    this.getTransactions()
    this.getUserData()
  }

  setTabView(p: any) {
    this.tab = p.tab;

    if (p.tab == 'production') {
      this.selectedIndex = 0;
      this.getTransactions();
    } else if (p.tab == 'raw') {
      this.selectedIndex = 1;
      this.getTransactions();
    } else {
      this.selectedIndex = 0;
      this.getTransactions();
    }
  }


  search() {

    this.getTransactions()

  }


  getTransactions() {

    if (this.tab == 'production') {
      this.fetchingProduction = true;
    } else {
      this.fetchingReport = true
    }


    this.productionService.getAllSalesTransaction(this.productionPage, this.status, this.searchTerm, this.tab == "production" ? "STORING" : "USAGE").subscribe(
      async (res: any) => {

        if (res.status === "success") {
          if (this.tab == 'production') {
            this.fetchingProduction = false;
          } else {
            this.fetchingReport = false
          }

          if (this.tab == 'production') {

            this.production = res.data.data
            this.totalProduction = res.total;
            this.productionStart = (this.productionPage - 1) * this.productionLimit;
            this.productionStop = this.productionStart + this.production.length;
          } else {

            this.reports = res.data.data
            this.totalReport = res.total;
            this.reportStart = (this.reportPage - 1) * this.reportLimit;
            this.reportStop = this.reportStart + this.reports.length;
          }

        } else {

          this.errorMessage = '' + res.message;
          if (this.tab == 'production') {
            this.fetchingProduction = false;
          } else {
            this.fetchingReport = false
          }
        }
      },
      (error: any) => {
        this.errorMessage = 'An error occured. Please try again later';
        if (this.tab == 'production') {
          this.fetchingProduction = false;
        } else {
          this.fetchingReport = false
        }
      }
    )


  }

  toggleAddModal(tab: string = "") {

    if (tab != "") {
      this.tab = tab;
    }

    this.showAddModal = !this.showAddModal;
  }

  toggleEditModal() {
    this.showEditModal = !this.showEditModal;
  }

  refreshList() {
    this.productionPage = 1;

    this.getTransactions()
  }

  refresRawList() {
    this.reportPage = 1;

    this.getTransactions()
  }

  editProduction(data: any) {
    this.selectedProduction = data;

    this.toggleEditModal();
  }

  onCreated(event: any) {

    this.toggleAddModal()
    this.getTransactions()
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
