import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { GeneralService } from '../../../services/general.service';
import { OutletService } from '../../../services/outlet.service';

@Component({
  selector: 'app-edit-outlet',
  templateUrl: './edit-outlet.component.html',
  styleUrls: ['./edit-outlet.component.scss']
})
export class EditOutletComponent implements OnInit {
  errorMessage: string = "";
  processLoading: boolean = false;
  name: string = "";
  location: string = "";
  address: string = "";

  currentUser: any = {}
  fetchingData: boolean = false

  @Input() visible: boolean = false;
  @Input() outlet: any = [];
  @Input() user: any = {};
  @Input() staff: any = [];
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter();
  @Output() updatedSchool: EventEmitter<any> = new EventEmitter();
  constructor(
    private generalService: GeneralService,
    private notification: NzNotificationService,
    private outletService: OutletService
  ) { }

  ngOnInit(): void {
    this.getUserData()
  }

  async getUserData() {
    this.fetchingData = true;
    this.currentUser = await this.generalService.getUserData()
    this.fetchingData = false;
  }

  update() {
    this.processLoading = false;


    if (this.outlet.name === '') {
      this.errorMessage = "outlet name is required";
      this.processLoading = false;
      return
    }

    if (this.outlet.localtion === '') {
      this.errorMessage = "location is required";
      this.processLoading = false;
      return
    }

    if (this.outlet.address === '') {
      this.errorMessage = "Address is required";
      this.processLoading = false;
      return
    }

    const payload = {
      name: this.outlet.name.trim(),
      address: this.outlet.address.trim(),
      location: this.outlet.location.trim(),
    }

    // this.outletService.updateSchool(payload, this.school.id).subscribe(
    //   (res: any) => {

    //     if (res.status == 'success') {
    //       this.processLoading = false;

    //       this.notification.success(res.message, '', {
    //         nzClass: 'notification1',
    //       });
    //       this.errorMessage = ''
    //       this.schoolName = '';
    //       this.selectedZone = '';
    //       this.principalName = '';
    //       this.address = '';
    //       this.noOfTeachers = '';
    //       this.updatedSchool.emit();

    //     } else {
    //       this.processLoading = false;
    //       this.notification.error(res.message, '', {
    //         nzClass: 'notification1',
    //       });
    //     }
    //   },
    //   (error: any) => {
    //     this.errorMessage = 'An error occured. Please try again later';
    //     this.processLoading = false;
    //   }
    // )
  }

  ngOnChanges(changes: any) {

  }

  handleCancel() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}
