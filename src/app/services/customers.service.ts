import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private readonly apiService: ApiService) { }
}
