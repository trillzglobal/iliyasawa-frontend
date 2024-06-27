import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private readonly apiService: ApiService) { }

  createProductStore(data: any) {
    return this.apiService.post(`admin/create/main-store-product`, data);
  }
}
