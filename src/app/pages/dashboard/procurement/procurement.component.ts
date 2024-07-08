import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { SalesService } from '../../../services/sales.service';

@Component({
  selector: 'app-procurement',
  templateUrl: './procurement.component.html',
  styleUrl: './procurement.component.scss'
})
export class ProcurementComponent {
  errorMessage: string = "";
  isLoading: boolean = false;
  selectedIndex: number = 0;

  fromDate: any = "";
  toDate: any = "";

  selectedProduct: any = {};
  showAddModal: boolean = false;
  showEditModal: boolean = false;

  // active doctors
  fetchingRecords: boolean = false;
  record: Array<any> = [];
  recordStart: number = 0;
  recordStop: number = 0;
  recordPage: number = 1;
  recordLimit: number = 25;
  totalRecords: number = 0;
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
    this.getProcurementTransaction()
  }

  setTabView(p: any) {
    if (p.tab == 'procurement') {
      this.selectedIndex = 0;
      this.getProcurementTransaction();
    } else if (p.tab == 'store') {
      this.selectedIndex = 1;
      this.getProcurementTransaction();
    } else {
      this.selectedIndex = 0;
      this.getProcurementTransaction();
    }
  }


  search() {

    this.getProcurementTransaction()

  }

  filter() {

  }


  getProcurementTransaction() {
    this.fetchingRecords = true;

    this.salesService.getAllSalesTransaction(this.recordPage, this.status, this.searchTerm).subscribe(
      async (res: any) => {
        console.log(res);
        if (res.status === 'success') {
          this.fetchingRecords = false;

          this.record = res.data.data
          this.totalRecords = res.total;
          this.recordStart = (this.recordPage - 1) * this.recordLimit;
          this.recordStop = this.recordStart + this.record.length;

        } else {

          this.errorMessage = '' + res.message;
          this.fetchingRecords = false;
          this.totalRecords = 0;
          this.recordStart = 0;
          this.recordStop = 0;
        }
      },
      (error: any) => {
        this.errorMessage = 'An error occured. Please try again later';
        this.fetchingRecords = false;
        this.totalRecords = 0;
        this.recordStart = 0;
        this.recordStop = 0;
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
    this.recordPage = 1;

    this.getProcurementTransaction()
  }

  editStore(data: any) {
    this.selectedProduct = data;

    this.toggleEditModal();
  }

  onCreated() {
    this.toggleAddModal()
    this.getProcurementTransaction()
  }

  onUpdated() {

  }
}
