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

  sample = [
    {
      "_id": "6600981563d8474d278f8920",
      "firstName": "Umar",
      "surname": "Farooq",
      "otherName": "",
      "emailAddress": "umaryusufkd@gmail.com",
      "emailAddressVerified": false,
      "phoneNumber": "+2348066249688",
      "gender": "Male",
      "role": "Sales Manager",
      "address": {
        "street": "123 Main Road",
        "city": "Barnawa",
        "state": "Kaduna",
        "country": "Nigeria",
        "zipCode": "800232",
        "_id": "6600981563d8474d278f8921"
      },
      "isBlocked": false,
      "status": "Active",
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
      "firstName": "Jane Smith",
      "surname": "Faroow",
      "otherName": "",
      "emailAddress": "janesmith@gmail.com",
      "emailAddressVerified": false,
      "phoneNumber": "+2348066249681",
      "gender": "Male",
      "role": "Production Manager",
      "address": {
        "street": "123 Main Road",
        "city": "Barnawa",
        "state": "Kaduna",
        "country": "Nigeria",
        "zipCode": "800232",
        "_id": "6600981563d8474d278f8921"
      },
      "isBlocked": false,
      "status": "Active",
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
      "firstName": "Albert",
      "surname": "Brown",
      "otherName": "",
      "emailAddress": "albertbrown@gmail.com",
      "emailAddressVerified": false,
      "phoneNumber": "+2348066249622",
      "gender": "Male",
      "role": "Admin",
      "address": {
        "street": "123 Main Road",
        "city": "Barnawa",
        "state": "Kaduna",
        "country": "Nigeria",
        "zipCode": "800232",
        "_id": "6600981563d8474d278f8921"
      },
      "isBlocked": false,
      "status": "Active",
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
    private productionService: ProductionService,
  ) {
    // this.route.queryParams.subscribe(p => {
    //   this.setTabView(p);
    // });
  }

  ngOnInit(): void {
    this.getProduction()
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

    this.production = this.sample
    this.totalProduction = 50;
    this.productionPage = 1;

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
