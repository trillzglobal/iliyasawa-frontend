import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private readonly apiService: ApiService) { }

  createUser(data: any) {
    return this.apiService.post(`customers`, data);
  }

  getAllUsers() {
    return this.apiService.get(`customers`);
  }

}
