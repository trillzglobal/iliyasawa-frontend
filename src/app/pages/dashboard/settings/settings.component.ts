import { Component } from '@angular/core';
import { SettingsService } from '../../../services/settings.service';
import { ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  errorMessage: string = "";
  isLoading: boolean = false;
  selectedIndex: number = 0;

  fromDate: any = "";
  toDate: any = "";

  selectedProduct: any = {};
  showAddModal: boolean = false;
  showEditModal: boolean = false;

  // active doctors
  fetchingSettings: boolean = false;
  settings: Array<any> = [];
  settingsStart: number = 0;
  settingsStop: number = 0;
  settingsPage: number = 1;
  settingsLimit: number = 25;
  totalSettings: number = 0;
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
    private settingsService: SettingsService,
  ) {
    // this.route.queryParams.subscribe(p => {
    //   this.setTabView(p);
    // });
  }

  ngOnInit(): void {
    this.getStore()
  }


  search() {

    this.getStore()

  }


  getStore() {

    this.fetchingSettings = true;

    // this.outletService.getAllOutlet(this.settingsPage - 1, this.settingsLimit, 'active', this.searchTerm, this.fromDate, this.toDate).subscribe(
    //   async (res: any) => {
    //     // console.log(res);
    //     if (res.statusCode === 200) {
    //       this.fetchingSettings = false;

    //       this.notification.success(
    //         res.message,
    //         "",
    //         { nzClass: 'notification1' }
    //       );

    //       this.store = res.data
    //       this.totalSettings = res.pagination.total;
    //       this.settingsStart = (this.settingsPage - 1) * this.settingsLimit;
    //       this.settingsStop = this.settingsStart + this.store.length;

    //     } else {
    //       this.notification.success(
    //         res.message,
    //         "",
    //         { nzClass: 'notification1' }
    //       );
    //       this.errorMessage = '' + res.message;
    //       this.fetchingSettings = false;
    //       this.totalSettings = 0;
    //       this.settingsStart = 0;
    //       this.settingsStop = 0;
    //     }
    //   },
    //   (error: any) => {
    //     this.errorMessage = 'An error occured. Please try again later';
    //     this.fetchingSettings = false;
    //     this.totalSettings = 0;
    //     this.settingsStart = 0;
    //     this.settingsStop = 0;
    //   }
    // )

    this.settings = this.sample
    this.totalSettings = 50;
    this.settingsPage = 1;

    this.fetchingSettings = false;

  }

  toggleAddModal() {
    this.showAddModal = !this.showAddModal;
  }

  toggleEditModal() {
    this.showEditModal = !this.showEditModal;
  }

  refreshList() {
    this.settingsPage = 1;

    this.getStore()
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
