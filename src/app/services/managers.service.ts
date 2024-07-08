import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ManagersService {

  constructor(private readonly apiService: ApiService) { }

  getMainStoreProducts() {
    return this.apiService.get(`managemant/main-store-products`);
  }

  getOutletStoreProducts() {
    return this.apiService.get(`managemant/outlet-store-products`);
  }

  getTransactions() {
    return this.apiService.get(`managemant/transactions`);
  }

  getApprovedTransactions() {
    return this.apiService.get(`managemant/approved/transactions`);
  }

}
