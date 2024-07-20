import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly apiService: ApiService) { }

  login(data: any) {
    return this.apiService.post(`login`, data);
  }

  resetPassword(data: any) {
    return this.apiService.post(`password/reset`, data)
  }

  forgotPassword(data: any) {
    return this.apiService.post(`password/email`, data);
  }

}
