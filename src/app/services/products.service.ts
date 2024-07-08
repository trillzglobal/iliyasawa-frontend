import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private readonly apiService: ApiService) { }

  createProduct(data: any) {
    return this.apiService.post(`products`, data);
  }

  getAllProducts(page: any, type: string = "", search: string = "") {
    return this.apiService.get(`products?page=${page}&type=${type}&search=${search}`);
  }


  getOneProduct(id: string) {
    return this.apiService.get(`products/${id}`);
  }
}
