import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class DistributionService {

  constructor(private readonly apiService: ApiService) { }
}
