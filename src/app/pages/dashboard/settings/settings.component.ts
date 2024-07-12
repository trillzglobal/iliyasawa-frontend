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

  fetchingSettings: boolean = false;
  settings: Array<any> = [];
  settingsStart: number = 0;
  settingsStop: number = 0;
  settingsPage: number = 1;
  settingsLimit: number = 25;
  totalSettings: number = 0;
  searchTerm: string = ""

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
