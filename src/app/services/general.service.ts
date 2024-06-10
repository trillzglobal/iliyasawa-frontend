import { Injectable } from '@angular/core';
import { EncryptStorage } from 'encrypt-storage';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { environment } from '../../environments/environment';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  environment: typeof environment = environment;

  constructor(
    private location: Location,
    private loadingBar: LoadingBarService,
    private apiService: ApiService,
    private router: Router,
  ) { }

  encryptStorage = new EncryptStorage(this.environment.privateKey, {
    prefix: '@ilysw',
    storageType: 'sessionStorage',
  });

  encryptLocalStorage = new EncryptStorage(environment.privateKey, {
    prefix: '@ilysw',
    storageType: 'localStorage',
  });

  goBack() {
    this.location.back();
  }

  logoutUser() {
    this.encryptStorage.clear();
    window.localStorage.clear();
    window.location.replace('');
  }

  getEnvironment() {
    return this.apiService.getEnvironment();
  }

  setEnvironment(env: string) {
    this.apiService.setEnvironment(env);
  }

  getStorageData(): any {
    const data = localStorage.getItem('user-data');
    return data ? JSON.parse(data) : {};
  }


  setToken(jwtToken: string) {
    this.encryptStorage.setItem('token', jwtToken);
  }

  getToken(): string {
    return this.encryptStorage.getItem('token')!;
  }

  setData(key: string, value: any) {
    this.encryptLocalStorage.setItem(key, value);
  }

  getData(key: string) {
    return this.encryptLocalStorage.getItem(key);
  }

  validateEmailAddress(emailString: string) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return (
      !!emailString &&
      typeof emailString === 'string' &&
      emailString.match(emailRegex)
    );
  }

  setUserData(data: any) {
    this.encryptStorage.setItem('user', JSON.stringify(data))
  }

  getUserData() {
    return this.encryptStorage.getItem('user')
  }
}
