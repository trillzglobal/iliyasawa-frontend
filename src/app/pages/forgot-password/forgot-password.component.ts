import { Component, OnInit } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from '../../services/auth.service';
import { GeneralService } from '../../services/general.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  successMessage: boolean = false;
  errorMessage: string = "";
  processLoading: boolean = false;
  user: any = {
    emailAddress: ""
  };
  constructor(
    public generalService: GeneralService,
    private authService: AuthService,
    private notification: NzNotificationService
  ) { }

  ngOnInit(): void {
  }

  sendReset() {
    this.errorMessage = "";
    this.processLoading = true;
    if ([this.user.emailAddress].includes("")) {
      this.errorMessage = "All fields are required.";
      this.processLoading = false;
    }
    else if (!this.generalService.validateEmailAddress(this.user.emailAddress)) {
      this.errorMessage = "Please enter a valid email.";
      this.processLoading = false;
    }
    else {
      const payload = {
        email: this.user.emailAddress
      }
      this.authService.forgotPassword(payload).subscribe(
        (res: any) => {
          if (res.status === "success") {
            this.processLoading = false;
            this.notification.success(
              'Password reset link sent successfully.',
              '' + res.message,
              { nzClass: 'notification1' }
            );
            this.successMessage = true;
          }
          else {
            this.errorMessage = '' + res.message;
            this.processLoading = false;
          }
        },
        (error: any) => {
          this.errorMessage = error;
          this.processLoading = false;
        }
      )
    }
  }

}
