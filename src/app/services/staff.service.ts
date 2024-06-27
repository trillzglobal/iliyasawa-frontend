import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  constructor(private readonly apiService: ApiService) { }

  createUser(data: any) {
    return this.apiService.post(`admin/create/user`, data);
  }

  getUserRoles() {
    return this.apiService.get(`admin/user/roles`);
  }
}
