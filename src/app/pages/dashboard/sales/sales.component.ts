import { Component } from '@angular/core';
import { SalesService } from '../../../services/sales.service';
import { ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { GeneralService } from '../../../services/general.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.scss'
})
export class SalesComponent {
  errorMessage: string = "";
  isLoading: boolean = false;
  selectedIndex: number = 0;

  fromDate: any = "";
  toDate: any = "";

  selectedProduct: any = {};
  showAddModal: boolean = false;
  showEditModal: boolean = false;

  fetchingSales: boolean = false;
  sales: Array<any> = [];
  salesStart: number = 0;
  salesStop: number = 0;
  salesPage: number = 1;
  salesLimit: number = 25;
  totalSales: number = 0;
  searchTerm: string = ""

  fetchingReport: boolean = false;
  reports: Array<any> = [];
  reportStart: number = 0;
  reportStop: number = 0;
  reportPage: number = 1;
  reportLimit: number = 25;
  totalReport: number = 0;
  searchTermReport: string = ""
  status: string = ""
  fetchingProducts: boolean = false;

  fetchingData: boolean = false;
  currentUser: any = {};
  userRole: any = "";

  processApprove: boolean = false;
  processAccept: boolean = false;

  viewTransactionModal: boolean = false;
  selectedTransaction: any = {}


  constructor(
    private readonly route: ActivatedRoute,
    private notification: NzNotificationService,
    private salesService: SalesService,
    private generalService: GeneralService,
  ) {
    this.route.queryParams.subscribe(p => {
      this.setTabView(p);
    });
  }

  ngOnInit(): void {
    this.getSales()
    this.getUserData()
  }

  setTabView(p: any) {
    if (p.tab == 'sales') {
      this.selectedIndex = 0;
      this.getSales();
    } else if (p.tab == 'production') {
      this.selectedIndex = 1;
      this.getSales();
    } else {
      this.selectedIndex = 0;
      this.getSales();
    }
  }


  search() {

    this.getSales()

  }

  filter() {

  }


  getSales() {

    this.fetchingSales = true;

    this.salesService.getAllSalesTransaction(this.salesPage, this.status, this.searchTerm, "SALES").subscribe(
      async (res: any) => {

        if (res.status === 'success') {
          this.fetchingSales = false;

          this.sales = res.data.data
          this.totalSales = res.total;
          this.salesStart = (this.salesPage - 1) * this.salesLimit;
          this.salesStop = this.salesStart + this.sales.length;

        } else {

          this.errorMessage = '' + res.message;
          this.fetchingSales = false;
          this.totalSales = 0;
          this.salesStart = 0;
          this.salesStop = 0;
        }
      },
      (error: any) => {
        this.errorMessage = 'An error occured. Please try again later';
        this.fetchingSales = false;
        this.totalSales = 0;
        this.salesStart = 0;
        this.salesStop = 0;
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
    this.salesPage = 1;

    this.getSales()
  }

  editStore(data: any) {
    this.selectedProduct = data;

    this.toggleEditModal();
  }

  onCreated() {
    this.toggleAddModal()
    this.getSales()
  }

  onUpdated() {

  }

  async getUserData() {
    this.fetchingData = true;
    this.currentUser = await this.generalService.getUserData();
    this.userRole = this.currentUser.current_role;
    this.fetchingData = false;
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

  toggleTransactionModal() {
    this.viewTransactionModal = !this.viewTransactionModal
  }

  showTransaction(transaction: any) {
    console.log(transaction)
    this.selectedTransaction = transaction;

    this.toggleTransactionModal()
  }
}
