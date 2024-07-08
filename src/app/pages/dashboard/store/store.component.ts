import { Component } from '@angular/core';
import { StoreService } from '../../../services/store.service';
import { ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { SalesService } from '../../../services/sales.service';

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

  sample = [
    {
      "_id": "6600981563d8474d278f8920",
      "name": "WUSE 2 ",
      "quantity": "123",
      "description": "Very good product",
      "status": "Available",
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
      "name": "Outlet 123",
      "quantity": "1234",
      "description": "some good product 3",
      "status": "Available",
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
      "name": "Albert place",
      "quantity": "2222222",
      "description": "some good product 1",
      "status": "Available",
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
    private storeService: StoreService,
    private salesService: SalesService
  ) {
    this.route.queryParams.subscribe(p => {
      this.setTabView(p);
    });
  }

  ngOnInit(): void {
    this.getStore()
  }

  setTabView(p: any) {
    if (p.tab == 'store') {
      this.selectedIndex = 0;
      this.getStore();
    } else if (p.tab == 'procurement') {
      this.selectedIndex = 1;
      this.getProcurementTransaction();
    } else if (p.tab == 'production') {
      this.selectedIndex = 2;
      // this.getReports();
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

  getProcurementTransaction() {
    this.fetchingProcurements = true;

    this.salesService.getAllSalesTransaction(this.procurementPage, this.status, this.searchTerm).subscribe(
      async (res: any) => {
        console.log(res);
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

  onCreated() {

  }

  onUpdated() {

  }
}
