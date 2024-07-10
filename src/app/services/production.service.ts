import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductionService {

  constructor(private readonly apiService: ApiService) { }


  getAllSalesTransaction(page: any, status: string = "", search: string = "", subtype = "") {
    return this.apiService.get(`transactions?page=${page}&status=${status}&search=${search}&subtype=${subtype}`);
  }
}
