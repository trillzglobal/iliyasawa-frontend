import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { GeneralService } from '../../../services/general.service';
import { OutletService } from '../../../services/outlet.service';

@Component({
  selector: 'app-add-outlet',
  templateUrl: './add-outlet.component.html',
  styleUrls: ['./add-outlet.component.scss']
})
export class AddOutletComponent implements OnInit {
  errorMessage: string = "";
  processLoading: boolean = false;
  location: string = "";
  name: string = "";
  description: string = "";

  currentUser: any = {}
  fetchingData: boolean = false
  userData: any = {};
  user_id: string = ""

  @Input() visible: boolean = false;
  @Input() user: any = {};
  @Input() staff: any = [];
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter();
  @Output() createdOutlet: EventEmitter<any> = new EventEmitter();
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

  submit() {
    this.processLoading = true;

    if (this.name === '') {
      this.errorMessage = "outlet name is required";
      this.processLoading = false;
      return
    } else {
      this.errorMessage = ""
    }

    if (this.description === '') {
      this.errorMessage = "Description is required";
      this.processLoading = false;
      return
    } else {
      this.errorMessage = ""
    }

    if (this.user_id === '') {
      this.errorMessage = "User must be selected";
      this.processLoading = false;
      return
    }

    const payload = {
      user_id: this.user_id,
      outlet_name: this.name.trim(),
      outlet_description: this.description,
    }

    console.log(payload)

    this.outletService.createOulet(payload).subscribe(
      (res: any) => {

        if (res.status == 'success') {
          this.processLoading = false;

          this.notification.success(res.message, '', {
            nzClass: 'notification1',
          });
          this.errorMessage = ''
          this.user_id = '';
          this.name = '';
          this.description = '';
          this.createdOutlet.emit();

        } else {
          this.processLoading = false;
          this.notification.error(res.message, '', {
            nzClass: 'notification1',
          });
        }
      },
      (error: any) => {
        this.errorMessage = error;
        this.processLoading = false;
      }
    )
  }

  ngOnChanges() {
    this.errorMessage = "";
    this.processLoading = false;
  }

  handleCancel() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}
