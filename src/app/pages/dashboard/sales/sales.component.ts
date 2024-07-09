import { Component } from '@angular/core';
import { SalesService } from '../../../services/sales.service';
import { ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

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

  // active doctors
  fetchingSales: boolean = false;
  sales: Array<any> = [];
  salesStart: number = 0;
  salesStop: number = 0;
  salesPage: number = 1;
  salesLimit: number = 25;
  totalSales: number = 0;
  searchTerm: string = ""


  // active doctors
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

  constructor(
    private readonly route: ActivatedRoute,
    private notification: NzNotificationService,
    private salesService: SalesService,
  ) {
    this.route.queryParams.subscribe(p => {
      this.setTabView(p);
    });
  }

  ngOnInit(): void {
    this.getSales()
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
        console.log(res);
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
}
