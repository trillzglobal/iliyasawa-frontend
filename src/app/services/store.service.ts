import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private readonly apiService: ApiService) { }
}
