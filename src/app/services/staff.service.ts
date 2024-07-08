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

  addRole(data: any) {
    return this.apiService.post(`admin/create/role`, data);
  }

  switchAccount() {
    return this.apiService.get(`switch-role`);
  }

}
