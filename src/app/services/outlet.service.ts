import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class OutletService {

  constructor(private readonly apiService: ApiService) { }

  createOulet(data: any) {
    return this.apiService.post(`outlets`, data);
  }

  getOutlets() {
    return this.apiService.get(`outlets`);
  }

  getOutletStoreProduct() {
    return this.apiService.get(`outlet-store-products`);
  }

  createOuletStoreTransactionDetails(data: any) {
    return this.apiService.post(`admin/create/transaction-detail`, data);
  }

  approveOuletStoreTransactionDetails(id: string, data: any) {
    return this.apiService.post(`admin/approve/transaction/${id}`, data);
  }

  getTransactions() {
    return this.apiService.get(`admin/transactions`);
  }

  getApprovedTransactions() {
    return this.apiService.get(`admin/approved/transactions`);
  }
}
