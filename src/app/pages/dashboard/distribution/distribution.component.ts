import { Component } from '@angular/core';
import { DistributionService } from '../../../services/distribution.service';
import { ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-distribution',
  templateUrl: './distribution.component.html',
  styleUrl: './distribution.component.scss'
})
export class DistributionComponent {
  errorMessage: string = "";
  isLoading: boolean = false;
  selectedIndex: number = 0;

  fromDate: any = "";
  toDate: any = "";

  selectedProduction: any = {};
  showAddModal: boolean = false;
  showEditModal: boolean = false;

  // active doctors
  fetchingDistribution: boolean = false;
  distribution: Array<any> = [];
  distributionStart: number = 0;
  distributionStop: number = 0;
  distributionPage: number = 1;
  distributionLimit: number = 25;
  totalDistribution: number = 0;
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
    private distributionService: DistributionService,
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

    this.fetchingDistribution = true;

    // this.distributionService.getAllOutlet(this.distributionPage - 1, this.distributionLimit, 'active', this.searchTerm, this.fromDate, this.toDate).subscribe(
    //   async (res: any) => {
    //     // console.log(res);
    //     if (res.statusCode === 200) {
    //       this.fetchingDistribution = false;

    //       this.notification.success(
    //         res.message,
    //         "",
    //         { nzClass: 'notification1' }
    //       );

    //       this.distribution = res.data
    //       this.totalDistribution = res.pagination.total;
    //       this.distributionStart = (this.distributionPage - 1) * this.distributionLimit;
    //       this.distributionStop = this.distributionStart + this.distribution.length;

    //     } else {
    //       this.notification.success(
    //         res.message,
    //         "",
    //         { nzClass: 'notification1' }
    //       );
    //       this.errorMessage = '' + res.message;
    //       this.fetchingDistribution = false;
    //       this.totalDistribution = 0;
    //       this.distributionStart = 0;
    //       this.distributionStop = 0;
    //     }
    //   },
    //   (error: any) => {
    //     this.errorMessage = 'An error occured. Please try again later';
    //     this.fetchingDistribution = false;
    //     this.totalDistribution = 0;
    //     this.distributionStart = 0;
    //     this.distributionStop = 0;
    //   }
    // )

    this.distribution = this.sample
    this.totalDistribution = 50;
    this.distributionPage = 1;

    this.fetchingDistribution = false;

  }

  toggleAddModal() {
    this.showAddModal = !this.showAddModal;
  }

  toggleEditModal() {
    this.showEditModal = !this.showEditModal;
  }

  refreshList() {
    this.distributionPage = 1;

    this.getProduction()
  }

  editDistribution(data: any) {
    this.selectedProduction = data;

    this.toggleEditModal();
  }

  onCreated() {

  }

  onUpdated() {

  }
}
