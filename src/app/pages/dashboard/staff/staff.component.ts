import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { StaffService } from '../../../services/staff.service';
import { GeneralService } from '../../../services/general.service';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrl: './staff.component.scss'
})

export class StaffComponent {

  errorMessage: string = "";
  isLoading: boolean = false;
  selectedIndex: number = 0;
  processLoading: boolean = false
  roles: any = []

  fromDate: any = "";
  toDate: any = "";

  selectedStaff: any = {};
  showAddModal: boolean = false;
  showEditModal: boolean = false;

  fetchingStaff: boolean = false;
  staff: Array<any> = [];
  staffCopy: Array<any> = [];
  staffStart: number = 0;
  staffStop: number = 0;
  staffPage: number = 1;
  staffLimit: number = 25;
  totalStaff: number = 0;
  searchTerm: string = ""

  fetchingData: boolean = false;
  currentUser: any = {};
  userRole: any = "";

  constructor(
    private notification: NzNotificationService,
    private staffService: StaffService,
    private generalService: GeneralService,
  ) {

  }

  ngOnInit(): void {
    this.getStaff()
    this.getAllRoles()
    this.getUserData()
  }


  searchStaff() {

    if (this.searchTerm != "") {
      const result = [...this.staffCopy].filter((el: any) => {
        return el.firstname.toLowerCase().indexOf(this.searchTerm.toLowerCase()) != -1 || el.lastname.toLowerCase().indexOf(this.searchTerm.toLowerCase()) != -1 || el.email.toLowerCase().indexOf(this.searchTerm.toLowerCase()) != -1
      });

      this.staff = result;
    } else {
      this.staff = [...this.staffCopy]
    }

  }

  filterStaff(event: any) {
    const { value } = event.target;

    if (value != "") {

      let result: any = [];
      [...this.staffCopy].forEach((el: any) => {

        const roles = el.roles.map((e: any) => e.name).includes(value)

        // result = res
        if (roles) {
          result.push(el)
        }
      })

      this.staff = result;
    } else {
      this.staff = [...this.staffCopy]
    }
  }

  getAllRoles() {
    this.staffService.getAllRoles().subscribe(
      (res: any) => {

        if (res.status == 'success') {
          this.processLoading = false;

          res.data.forEach((el: any) => {
            el.isSelected = false
          })

          this.roles = res.data
          this.errorMessage = ''

        } else {
          this.processLoading = false;
          this.roles = [];
        }
      },
      (error: any) => {
        this.errorMessage = 'An error occured. Please try again later';
        this.processLoading = false;
      }
    )
  }

  getStaff() {

    this.fetchingStaff = true;

    this.staffService.getAllUsers().subscribe(
      async (res: any) => {
        if (res.status === 'success') {
          this.fetchingStaff = false;

          this.staff = res.data
          this.staffCopy = res.data
          this.totalStaff = res.data.length;

        } else {

          this.errorMessage = '' + res.message;
          this.fetchingStaff = false;
        }
      },
      (error: any) => {
        this.errorMessage = 'An error occured. Please try again later';
        this.fetchingStaff = false;
      }
    )

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
    this.toggleAddModal();
    this.getStaff()
  }

  onUpdatedStaff() {
    this.toggleEditModal()
    this.getStaff()
  }

  async getUserData() {
    this.fetchingData = true;
    this.currentUser = await this.generalService.getUserData();
    this.userRole = this.currentUser.current_role;
    this.fetchingData = false;
  }

}
