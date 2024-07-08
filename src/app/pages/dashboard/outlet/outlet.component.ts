import { Component } from '@angular/core';
import { OutletService } from '../../../services/outlet.service';
import { ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { GeneralService } from '../../../services/general.service';
import { StaffService } from '../../../services/staff.service';

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
  outletsCopy: Array<any> = [];
  outletStart: number = 0;
  outletStop: number = 0;
  outletPage: number = 1;
  outletLimit: number = 25;
  totalOutlet: number = 0;
  searchTerm: string = ""
  currentUser: any = {}
  fetchingData: boolean = false

  fetchingStaff: boolean = false
  staff: any = []


  constructor(
    private readonly route: ActivatedRoute,
    private notification: NzNotificationService,
    private outletService: OutletService,
    private generalService: GeneralService,
    private staffService: StaffService
  ) {
    // this.route.queryParams.subscribe(p => {
    //   this.setTabView(p);
    // });
  }

  ngOnInit(): void {
    this.getOutlet()
    this.getStaff()
  }


  search() {
    if (this.searchTerm != "") {

      const result = [...this.outletsCopy].filter((el: any) => {
        return el.name.toLowerCase().indexOf(this.searchTerm.toLowerCase()) != -1 || el.description.toLowerCase().indexOf(this.searchTerm.toLowerCase()) != -1
      });

      this.outlets = result;
    } else {
      this.outlets = [...this.outletsCopy]
    }
  }


  getOutlet() {
    this.fetchingOutlet = true;

    this.outletService.getOutlets().subscribe(
      async (res: any) => {

        if (res.status === 'success') {
          this.fetchingOutlet = false;

          this.notification.success(
            res.message,
            "",
            { nzClass: 'notification1' }
          );

          this.outlets = res.data
          this.outletsCopy = res.data
          this.totalOutlet = res.data.length;
          // this.outletStart = (this.outletPage - 1) * this.outletLimit;
          // this.outletStop = this.outletStart + this.outlets.length;

        } else {
          this.notification.success(
            res.message,
            "",
            { nzClass: 'notification1' }
          );
          this.errorMessage = '' + res.message;
          this.fetchingOutlet = false;
          // this.totalOutlet = 0;
          // this.outletStart = 0;
          // this.outletStop = 0;
        }
      },
      (error: any) => {
        this.errorMessage = 'An error occured. Please try again later';
        this.fetchingOutlet = false;
        // this.totalOutlet = 0;
        // this.outletStart = 0;
        // this.outletStop = 0;
      }
    )

    // this.outlets = this.sample
    // this.totalOutlet = 50;
    // this.outletPage = 1;

    // this.fetchingOutlet = false;

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
    this.toggleAddModal()
    this.getOutlet()
  }

  onUpdated() {
    this.toggleEditModal()
    this.getOutlet()
  }

  getStaff() {

    this.fetchingStaff = true;

    this.staffService.getAllUsers().subscribe(
      async (res: any) => {
        console.log(res);
        if (res.status === 'success') {
          this.fetchingStaff = false;

          if (res.data.length > 0) {
            let result: any = [];
            [...res.data].forEach((el: any) => {

              const roles = el.roles.map((e: any) => e.name).includes('OUTLET_ADMIN')

              // result = res
              if (roles) {
                result.push(el)
              }
            })

            console.log('filter result', result)

            this.staff = result;
          } else {
            this.staff = res.data
          }

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

    // this.staff = this.sample
    // this.totalStaff = 50;
    // this.staffPage = 1;

    // this.fetchingStaff = false;

  }
}
