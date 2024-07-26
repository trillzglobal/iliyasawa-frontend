import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(private readonly apiService: ApiService) { }

  createTransactions(data: any) {
    return this.apiService.post(`transactions/initiate`, data);
  }

  getAllSalesTransaction(page: any, status: string = "", search: string = "", subtype = "") {
    return this.apiService.get(`transactions?page=${page}&status=${status}&search=${search}&subtype=${subtype}`);
  }

  getSalesSummary() {
    return this.apiService.get(`transactions/summary`);
  }

  acceptSalesTransaction(id: any) {
    return this.apiService.post(`transactions/accept/${id}`, {});
  }

  createTransactionReport(data: any) {
    return this.apiService.post(`transactions/report`, data);
  }
}
