import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { StaffService } from '../../../services/staff.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrl: './staff.component.scss'
})
export class StaffComponent {

  errorMessage: string = "";
  isLoading: boolean = false;
  selectedIndex: number = 0;

  fromDate: any = "";
  toDate: any = "";

  selectedStaff: any = {};
  showAddModal: boolean = false;
  showEditModal: boolean = false;

  // active doctors
  fetchingStaff: boolean = false;
  staff: Array<any> = [];
  staffStart: number = 0;
  staffStop: number = 0;
  staffPage: number = 1;
  staffLimit: number = 25;
  totalStaff: number = 0;
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
    private staffService: StaffService,
  ) {
    // this.route.queryParams.subscribe(p => {
    //   this.setTabView(p);
    // });
  }

  ngOnInit(): void {
    this.getStaff()
  }


  searchStaff() {

    this.getStaff()

  }


  getStaff() {

    this.fetchingStaff = true;

    // this.staffService.getAllStaff(this.staffPage - 1, this.staffLimit, 'active', this.searchTerm, this.fromDate, this.toDate).subscribe(
    //   async (res: any) => {
    //     // console.log(res);
    //     if (res.statusCode === 200) {
    //       this.fetchingStaff = false;

    //       this.notification.success(
    //         res.message,
    //         "",
    //         { nzClass: 'notification1' }
    //       );

    //       this.staff = res.data
    //       this.totalStaff = res.pagination.total;
    //       this.staffStart = (this.staffPage - 1) * this.staffLimit;
    //       this.staffStop = this.staffStart + this.staff.length;

    //     } else {
    //       this.notification.success(
    //         res.message,
    //         "",
    //         { nzClass: 'notification1' }
    //       );
    //       this.errorMessage = '' + res.message;
    //       this.fetchingStaff = false;
    //       this.totalStaff = 0;
    //       this.staffStart = 0;
    //       this.staffStop = 0;
    //     }
    //   },
    //   (error: any) => {
    //     this.errorMessage = 'An error occured. Please try again later';
    //     this.fetchingStaff = false;
    //     this.totalStaff = 0;
    //     this.staffStart = 0;
    //     this.staffStop = 0;
    //   }
    // )

    this.staff = this.sample
    this.totalStaff = 50;
    this.staffPage = 1;

    this.fetchingStaff = false;

  }

  toggleAddModal() {
    this.showAddModal = !this.showAddModal;
  }

  toggleEditModal() {
    this.showEditModal = !this.showEditModal;
  }

  refreshStaffList() {
    this.staffPage = 1;

    this.getStaff()
  }

  editStaff(data: any) {
    this.selectedStaff = data;

    this.toggleEditModal();
  }

  onCreatedStaff() {

  }

  onUpdatedStaff() {

  }
}
