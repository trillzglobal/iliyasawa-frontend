import { Component } from '@angular/core';
import { CustomersService } from '../../../services/customers.service';
import { ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { GeneralService } from '../../../services/general.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.scss'
})
export class CustomersComponent {
  errorMessage: string = "";
  isLoading: boolean = false;
  selectedIndex: number = 0;

  fromDate: any = "";
  toDate: any = "";

  selectedCustomer: any = {};
  showAddModal: boolean = false;
  showEditModal: boolean = false;

  fetchingCustomers: boolean = false;
  customers: Array<any> = [];
  customersStart: number = 0;
  customersStop: number = 0;
  customersPage: number = 1;
  customersLimit: number = 25;
  totalCustomers: number = 0;
  searchTerm: string = ""

  fetchingData: boolean = false;
  currentUser: any = {};
  userRole: any = "";

  constructor(
    private readonly route: ActivatedRoute,
    private notification: NzNotificationService,
    private customersService: CustomersService,
    private generalService: GeneralService,
  ) {
    // this.route.queryParams.subscribe(p => {
    //   this.setTabView(p);
    // });
  }

  ngOnInit(): void {
    this.getAllCustomers()
    this.getUserData()
  }


  search() {

    this.getAllCustomers()

  }


  getAllCustomers() {

    this.fetchingCustomers = true;

    this.customersService.getAllUsers().subscribe(
      async (res: any) => {
        if (res.status === "success") {
          this.fetchingCustomers = false;


          this.customers = res.data
          this.totalCustomers = res.data.length;

        } else {

          this.errorMessage = '' + res.message;
          this.fetchingCustomers = false;
        }
      },
      (error: any) => {
        this.errorMessage = 'An error occured. Please try again later';
        this.fetchingCustomers = false;

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
    this.customersPage = 1;

    this.getAllCustomers()
  }

  editCustomer(data: any) {
    this.selectedCustomer = data;

    this.toggleEditModal();
  }

  onCreated() {
    this.toggleAddModal()
    this.getAllCustomers()
  }

  onUpdated() {

  }

  async getUserData() {
    this.fetchingData = true;
    this.currentUser = await this.generalService.getUserData();
    this.userRole = this.currentUser.current_role;
    this.fetchingData = false;
  }
}
