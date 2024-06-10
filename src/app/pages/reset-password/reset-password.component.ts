import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from '../../services/auth.service';
import { GeneralService } from '../../services/general.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  token: string = "";
  email: string = "";
  password: string = "";
  confirmPassword: string = "";
  processLoading: boolean = false;
  errorMessage: string = "";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private notification: NzNotificationService,
    private generalService: GeneralService
  ) {
    this.token = this.route.snapshot.params['token'];
  }

  ngOnInit(): void {
  }

  resetPassword() {
    // Only continue if process is not loading
    if (this.processLoading) return;

    this.errorMessage = "";
    this.processLoading = true;
    if ([this.email, this.password, this.confirmPassword].includes("")) {
      this.errorMessage = "All fields are required.";
      this.processLoading = false;
    }
    else if (this.password !== this.confirmPassword) {
      this.errorMessage = "The passwords do not match.";
      this.processLoading = false;
    }
    else if (!this.generalService.validateEmailAddress(this.email)) {
      this.errorMessage = "Please enter a valid email.";
      this.processLoading = false;
    }
    else {
      let data = {
        resetToken: this.token,
        emailAddress: this.email.toLowerCase(),
        password: this.password,
        userAgent: navigator.userAgent
      }
      this.authService.resetPassword(data).subscribe(
        (res: any) => {
          if (res.statusCode === 200) {
            this.processLoading = false;
            this.notification.success(
              'Password reset successful.',
              '' + res.message,
              { nzClass: 'notification1' }
            );
            this.router.navigate(['']);
          }
          else {
            this.errorMessage = '' + res.message;
            this.processLoading = false;
          }
        },
        (error: any) => {
          this.errorMessage = 'An error occured. Please try again later';
          this.processLoading = false;
        }
      )
    }
  }

}
