import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from '../../services/auth.service';
import { GeneralService } from '../../services/general.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  errorMessage: string = "";
  processLoading: boolean = false;
  emailAddress: string = ''
  password: string = ''
  successMessage: boolean = false;
  message: string = '';

  constructor(
    private router: Router,
    private generalService: GeneralService,
    private authService: AuthService,
    private notification: NzNotificationService,
  ) { }

  ngOnInit(): void {
  }


  signIn() {

    this.errorMessage = "";
    this.processLoading = true;

    if ([this.emailAddress, this.password].includes("")) {
      this.errorMessage = "All fields are required.";
      this.processLoading = false;
    }
    else if (!this.generalService.validateEmailAddress(this.emailAddress)) {
      this.errorMessage = "Please enter a valid email.";
      this.processLoading = false;
    }
    else {

      const data = {
        email: this.emailAddress.trim(),
        password: this.password
      }

      this.authService.login(data).subscribe(
        async (res: any) => {
          console.log(res);
          if (res.status === "success") {
            this.processLoading = false;
            this.notification.success(
              'Account signin successful.',
              '' + "Success",
              { nzClass: 'notification1' }
            );

            this.generalService.setUserData(res.user);

            // add user data to localstorage
            this.generalService.setData('user-data', res.user);

            console.log('token', res.authorisation.token);
            this.generalService.setToken(res.authorisation.token);

            setTimeout(() => {
              this.router.navigate(['/dashboard']);
            }, 500);
          } else {
            this.notification.warning(
              'Error signin successful.',
              '' + res.message,
              { nzClass: 'notification1' }
            );
            this.errorMessage = '' + res.message;
            this.processLoading = false;
          }
        },
        (error: any) => {
          console.log(error);
          this.errorMessage = 'An error occured. Please try again later';
          this.processLoading = false;
        }
      )
    }


  }

}
