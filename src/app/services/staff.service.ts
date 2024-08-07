import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  constructor(private readonly apiService: ApiService) { }

  createUser(data: any) {
    return this.apiService.post(`invite-user`, data);
  }

  getUserRoles() {
    return this.apiService.get(`user/roles`);
  }


  getAllRoles() {
    return this.apiService.get(`roles`);
  }

  getAllUsers() {
    return this.apiService.get(`users`);
  }

  updateUserRole(data: any) {
    return this.apiService.post(`user/update-roles`, data);
  }

  resetPassword(data: any) {
    return this.apiService.post(`password/email`, data);
  }

  switchAccount(payload: any) {
    return this.apiService.post(`switch-roles`, payload);
  }

}
