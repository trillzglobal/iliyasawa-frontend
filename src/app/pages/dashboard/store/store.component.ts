import { Component } from '@angular/core';
import { StoreService } from '../../../services/store.service';
import { ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { SalesService } from '../../../services/sales.service';
import { ProductionService } from '../../../services/production.service';
import { GeneralService } from '../../../services/general.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrl: './store.component.scss'
})
export class StoreComponent {
  errorMessage: string = "";
  isLoading: boolean = false;
  selectedIndex: number = 0;

  fromDate: any = "";
  toDate: any = "";

  selectedProduct: any = {};
  showAddModal: boolean = false;
  showEditModal: boolean = false;

  fetchingStore: boolean = false;
  store: Array<any> = [];
  storeStart: number = 0;
  storeStop: number = 0;
  storePage: number = 1;
  storeLimit: number = 25;
  totalStore: number = 0;
  searchTerm: string = ""

  fetchingProcurements: boolean = false;
  procurement: Array<any> = [];
  procurementStart: number = 0;
  procurementStop: number = 0;
  procurementPage: number = 1;
  procurementLimit: number = 25;
  totalProcurement: number = 0;
  status: string = ""

  fetchingProduction: boolean = false;
  production: Array<any> = [];
  productionStart: number = 0;
  productionStop: number = 0;
  productionPage: number = 1;
  productionLimit: number = 25;
  totalProduction: number = 0;
  searchActiveTerm: string = ""
  fetchingData: boolean = false;
  currentUser: any = {};
  userRole: string = ""

  processAccept: boolean = false;
  processApprove: boolean = false;

  viewTransactionModal: boolean = false;
  selectedTransaction: any = {}
  title: string = ""


  constructor(
    private readonly route: ActivatedRoute,
    private notification: NzNotificationService,
    private storeService: StoreService,
    private salesService: SalesService,
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
    } else if (p.tab == 'procurement') {
      this.selectedIndex = 1;
      this.title = "procurement"
      this.getProcurementTransaction();
    } else if (p.tab == 'production') {
      this.selectedIndex = 2;
      this.title = "production"
      this.getProductionReports()
    } else {
      this.selectedIndex = 0;
      this.getStore();
    }
  }


  search() {

    this.getStore()

  }

  searchProcurement() {
    this.getProcurementTransaction()
  }


  getStore() {

    this.fetchingStore = true;

    this.storeService.getStoreProducts("RAW_MATERIAL").subscribe(
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

  getProcurementTransaction() {
    this.fetchingProcurements = true;

    this.salesService.getAllSalesTransaction(this.procurementPage, this.status, this.searchTerm, "PROCUREMENT").subscribe(
      async (res: any) => {

        if (res.status === 'success') {
          this.fetchingProcurements = false;

          this.procurement = res.data.data
          this.totalProcurement = res.total;
          this.procurementStart = (this.procurementPage - 1) * this.procurementLimit;
          this.procurementStop = this.procurementStart + this.procurement.length;

        } else {

          this.errorMessage = '' + res.message;
          this.fetchingProcurements = false;
          this.totalProcurement = 0;
          this.procurementStart = 0;
          this.procurementStop = 0;
        }
      },
      (error: any) => {
        this.errorMessage = 'An error occured. Please try again later';
        this.fetchingProcurements = false;
        this.totalProcurement = 0;
        this.procurementStart = 0;
        this.procurementStop = 0;
      }
    )
  }

  getProductionReports() {
    this.productionService.getAllSalesTransaction(this.productionPage, this.status, this.searchTerm, "USAGE").subscribe(
      async (res: any) => {

        if (res.status === "success") {

          this.fetchingProduction = false;

          this.production = res.data.data
          this.totalProduction = res.total;
          this.productionStart = (this.productionPage - 1) * this.productionLimit;
          this.productionStop = this.productionStart + this.production.length;

        } else {

          this.errorMessage = '' + res.message;

          this.fetchingProduction = false;

        }
      },
      (error: any) => {
        this.errorMessage = 'An error occured. Please try again later';

        this.fetchingProduction = false;

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
    this.storePage = 1;

    this.getStore()
  }

  refreshProductionList() {
    this.productionPage = 1
    this.getProductionReports()
  }

  refreshProcurementList() {
    this.procurementPage = 1;

    this.getProcurementTransaction()
  }

  editStore(data: any) {
    this.selectedProduct = data;

    this.toggleEditModal();
  }

  async getUserData() {
    this.fetchingData = true;
    this.currentUser = await this.generalService.getUserData();
    this.userRole = this.currentUser.current_role;
    this.fetchingData = false;
  }

  onCreated(data: any) {
    this.toggleAddModal()

    this.getProductionReports()
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

  toggleTransactionModal() {
    this.viewTransactionModal = !this.viewTransactionModal
  }

  showTransaction(transaction: any) {
    console.log(transaction)
    this.selectedTransaction = transaction;

    this.toggleTransactionModal()
  }
}
