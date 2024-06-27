import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private readonly apiService: ApiService) { }

  createTransactionDetails(data: any) {
    return this.apiService.post(`admin/create/transaction-detail`, data);
  }

  approveTransactionDetails(transactionId: any) {
    return this.apiService.post(`/admin/approve/transaction/${transactionId}`, {});
  }

  getTransaction(transactionId: any) {
    return this.apiService.get(`/admin/transactions`);
  }
}
