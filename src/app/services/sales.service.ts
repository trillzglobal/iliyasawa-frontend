import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class SalesService {

  constructor(private readonly apiService: ApiService) { }

  createSales(data: any) {
    return this.apiService.post(`transactions/initiate`, data);
  }

  getAllSalesTransaction(page: any, status: string = "", search: string = "") {
    return this.apiService.get(`transactions?page=${page}&status=${status}&search=${search}`);
  }


  getSalesSummary() {
    return this.apiService.get(`transactions/summary`);
  }

  acceptSalesTransaction(id: any) {
    return this.apiService.post(`transactions/accept/${id}`, {});
  }
}
