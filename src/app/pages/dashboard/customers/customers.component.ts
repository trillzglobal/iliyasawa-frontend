import { Component } from '@angular/core';
import { CustomersService } from '../../../services/customers.service';
import { ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

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

  // active doctors
  fetchingCustomers: boolean = false;
  customers: Array<any> = [];
  customersStart: number = 0;
  customersStop: number = 0;
  customersPage: number = 1;
  customersLimit: number = 25;
  totalCustomers: number = 0;
  searchTerm: string = ""

  constructor(
    private readonly route: ActivatedRoute,
    private notification: NzNotificationService,
    private customersService: CustomersService,
  ) {
    // this.route.queryParams.subscribe(p => {
    //   this.setTabView(p);
    // });
  }

  ngOnInit(): void {
    this.getAllCustomers()
  }


  search() {

    this.getAllCustomers()

  }


  getAllCustomers() {

    this.fetchingCustomers = true;

    this.customersService.getAllUsers().subscribe(
      async (res: any) => {
        console.log(res);
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
}
