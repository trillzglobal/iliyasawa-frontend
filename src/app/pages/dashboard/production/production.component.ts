import { Component } from '@angular/core';
import { ProductionService } from '../../../services/production.service';
import { ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

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

  // active doctors
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


  constructor(
    private readonly route: ActivatedRoute,
    private notification: NzNotificationService,
    private productionService: ProductionService,
  ) {
    this.route.queryParams.subscribe(p => {
      this.setTabView(p);
    });
  }

  ngOnInit(): void {
    this.getProduction()
  }

  setTabView(p: any) {
    if (p.tab == 'sales') {
      this.selectedIndex = 0;
      this.getProduction();
    } else if (p.tab == 'raw') {
      this.selectedIndex = 1;
    } else {
      this.selectedIndex = 0;
      this.getProduction();
    }
  }


  search() {

    this.getProduction()

  }


  getProduction() {

    this.fetchingProduction = true;

    // this.productionService.getAllOutlet(this.productionPage - 1, this.productionLimit, 'active', this.searchTerm, this.fromDate, this.toDate).subscribe(
    //   async (res: any) => {
    //     // console.log(res);
    //     if (res.statusCode === 200) {
    //       this.fetchingProduction = false;

    //       this.notification.success(
    //         res.message,
    //         "",
    //         { nzClass: 'notification1' }
    //       );

    //       this.production = res.data
    //       this.totalProduction = res.pagination.total;
    //       this.productionStart = (this.productionPage - 1) * this.productionLimit;
    //       this.productionStop = this.productionStart + this.production.length;

    //     } else {
    //       this.notification.success(
    //         res.message,
    //         "",
    //         { nzClass: 'notification1' }
    //       );
    //       this.errorMessage = '' + res.message;
    //       this.fetchingProduction = false;
    //       this.totalProduction = 0;
    //       this.productionStart = 0;
    //       this.productionStop = 0;
    //     }
    //   },
    //   (error: any) => {
    //     this.errorMessage = 'An error occured. Please try again later';
    //     this.fetchingProduction = false;
    //     this.totalProduction = 0;
    //     this.productionStart = 0;
    //     this.productionStop = 0;
    //   }
    // )


    this.fetchingProduction = false;
  }

  toggleAddModal() {
    this.showAddModal = !this.showAddModal;
  }

  toggleEditModal() {
    this.showEditModal = !this.showEditModal;
  }

  refreshList() {
    this.productionPage = 1;

    this.getProduction()
  }

  editProduction(data: any) {
    this.selectedProduction = data;

    this.toggleEditModal();
  }

  onCreated() {

  }

  onUpdated() {

  }
}
