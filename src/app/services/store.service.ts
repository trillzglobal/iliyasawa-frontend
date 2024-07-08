import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private readonly apiService: ApiService) { }


  createMainStore(data: any) {
    return this.apiService.post(`/create/main-store-product`, data);
  }

  getStoreProducts(type: string = "") {
    return this.apiService.get(`products?type=${type}`);
  }

  createTransactionDetails(data: any) {
    return this.apiService.post(`admin/create/transaction-detail`, data);
  }

  approveTransactionDetails(id: string, data: any) {
    return this.apiService.post(`admin/approve/transaction/${id}`, data);
  }

  getAdminTransaction() {
    return this.apiService.get(`admin/transactions`);
  }

  getAdminApprovedTransaction() {
    return this.apiService.get(`admin/approved/transactions`);
  }
}
