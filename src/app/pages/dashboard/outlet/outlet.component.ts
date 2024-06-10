import { Component } from '@angular/core';
import { OutletService } from '../../../services/outlet.service';
import { ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-outlet',
  templateUrl: './outlet.component.html',
  styleUrl: './outlet.component.scss'
})
export class OutletComponent {
  errorMessage: string = "";
  isLoading: boolean = false;
  selectedIndex: number = 0;

  fromDate: any = "";
  toDate: any = "";

  selectedOutlet: any = {};
  showAddModal: boolean = false;
  showEditModal: boolean = false;

  // active doctors
  fetchingOutlet: boolean = false;
  outlets: Array<any> = [];
  outletStart: number = 0;
  outletStop: number = 0;
  outletPage: number = 1;
  outletLimit: number = 25;
  totalOutlet: number = 0;
  searchTerm: string = ""

  sample = [
    {
      "_id": "6600981563d8474d278f8920",
      "name": "WUSE 2 ",
      "location": "Location 123",
      "address": "123 Main Road",
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
      "name": "Outlet 123",
      "location": "New Location 1234",
      "address": "21A Main Road 2",
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
      "name": "Albert place",
      "location": "Location xyz",
      "address": "123 Other Road",
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
    private outletService: OutletService,
  ) {
    // this.route.queryParams.subscribe(p => {
    //   this.setTabView(p);
    // });
  }

  ngOnInit(): void {
    this.getOutlet()
  }


  search() {

    this.getOutlet()

  }


  getOutlet() {

    this.fetchingOutlet = true;

    // this.outletService.getAllOutlet(this.outletPage - 1, this.outletLimit, 'active', this.searchTerm, this.fromDate, this.toDate).subscribe(
    //   async (res: any) => {
    //     // console.log(res);
    //     if (res.statusCode === 200) {
    //       this.fetchingOutlet = false;

    //       this.notification.success(
    //         res.message,
    //         "",
    //         { nzClass: 'notification1' }
    //       );

    //       this.outlets = res.data
    //       this.totalOutlet = res.pagination.total;
    //       this.outletStart = (this.outletPage - 1) * this.outletLimit;
    //       this.outletStop = this.outletStart + this.outlets.length;

    //     } else {
    //       this.notification.success(
    //         res.message,
    //         "",
    //         { nzClass: 'notification1' }
    //       );
    //       this.errorMessage = '' + res.message;
    //       this.fetchingOutlet = false;
    //       this.totalOutlet = 0;
    //       this.outletStart = 0;
    //       this.outletStop = 0;
    //     }
    //   },
    //   (error: any) => {
    //     this.errorMessage = 'An error occured. Please try again later';
    //     this.fetchingOutlet = false;
    //     this.totalOutlet = 0;
    //     this.outletStart = 0;
    //     this.outletStop = 0;
    //   }
    // )

    this.outlets = this.sample
    this.totalOutlet = 50;
    this.outletPage = 1;

    this.fetchingOutlet = false;

  }

  toggleAddModal() {
    this.showAddModal = !this.showAddModal;
  }

  toggleEditModal() {
    this.showEditModal = !this.showEditModal;
  }

  refreshList() {
    this.outletPage = 1;

    this.getOutlet()
  }

  editOutlet(data: any) {
    this.selectedOutlet = data;

    this.toggleEditModal();
  }

  onCreated() {

  }

  onUpdated() {

  }
}
