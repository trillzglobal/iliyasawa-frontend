import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { GeneralService } from '../services/general.service';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private generalService: GeneralService,
    private router: Router,
    private notification: NzNotificationService,
  ) { }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let token: any = this.generalService.getToken()

    let secureReq;
    // Don't add header to external APIs
    if (
      !request.url.includes("157.245.119.74")
      && !request.url.includes("localhost")
    ) {
      secureReq = request.clone();

    } else {
      if (token) {
        secureReq = request.clone({
          setHeaders: {
            Authorization: "Bearer " + token,
          },
        });
      } else {
        secureReq = request.clone();
      }
    }
    return next.handle(secureReq).pipe(
      catchError((error) => {
        // console.log(error);
        if (error.status === 403 && error.error.message == "Forbidden resource") {
          // this.generalService.logoutUser();
          this.notification.warning(
            'You don\'t have permission to this resource.',
            '' + error.error.message,
            { nzClass: 'notification1' }
          );
        }

        if (
          (error.error.statusCode == 401 && error.error.message == "Could not validate token with Authentication service - Access Restricted!")
        ) {
          this.generalService.logoutUser();
        }
        if (error.status === 500) {
          return throwError({
            statusCode: 500,
            message: 'An error occured. Please try again later.',
          });
        } else {
          return throwError('User not signed in');
        }
      })
    );
  }
}
