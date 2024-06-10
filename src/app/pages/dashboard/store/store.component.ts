import { Component } from '@angular/core';
import { StoreService } from '../../../services/store.service';
import { ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

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

  // active doctors
  fetchingStore: boolean = false;
  store: Array<any> = [];
  storeStart: number = 0;
  storeStop: number = 0;
  storePage: number = 1;
  storeLimit: number = 25;
  totalStore: number = 0;
  searchTerm: string = ""

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

    this.fetchingStore = true;

    // this.outletService.getAllOutlet(this.storePage - 1, this.storeLimit, 'active', this.searchTerm, this.fromDate, this.toDate).subscribe(
    //   async (res: any) => {
    //     // console.log(res);
    //     if (res.statusCode === 200) {
    //       this.fetchingStore = false;

    //       this.notification.success(
    //         res.message,
    //         "",
    //         { nzClass: 'notification1' }
    //       );

    //       this.store = res.data
    //       this.totalStore = res.pagination.total;
    //       this.storeStart = (this.storePage - 1) * this.storeLimit;
    //       this.storeStop = this.storeStart + this.store.length;

    //     } else {
    //       this.notification.success(
    //         res.message,
    //         "",
    //         { nzClass: 'notification1' }
    //       );
    //       this.errorMessage = '' + res.message;
    //       this.fetchingStore = false;
    //       this.totalStore = 0;
    //       this.storeStart = 0;
    //       this.storeStop = 0;
    //     }
    //   },
    //   (error: any) => {
    //     this.errorMessage = 'An error occured. Please try again later';
    //     this.fetchingStore = false;
    //     this.totalStore = 0;
    //     this.storeStart = 0;
    //     this.storeStop = 0;
    //   }
    // )

    this.store = this.sample
    this.totalStore = 50;
    this.storePage = 1;

    this.fetchingStore = false;

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

  editStore(data: any) {
    this.selectedProduct = data;

    this.toggleEditModal();
  }

  onCreated() {

  }

  onUpdated() {

  }
}
