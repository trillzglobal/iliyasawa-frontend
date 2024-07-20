import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { EncryptStorage } from 'encrypt-storage';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  envChange = new EventEmitter();
  env!: string;
  url: string;
  organisation: any;
  encryptStorage = new EncryptStorage(environment.privateKey, {
    prefix: '@healme',
    storageType: 'localStorage',
  });

  constructor(public http: HttpClient) {
    this.url = environment.apiUrl
  }

  getUrl() {
    this.url = environment.apiUrl

    return this.url;
  }

  getEnvironment() {
    return this.encryptStorage.getItem('env')!;
  }

  setEnvironment(env: string) {
    this.encryptStorage.setItem('env', env);
  }

  get(endpoint: string, params?: any, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }
    // Support easy query params for GET requests
    if (params) {
      reqOpts.params = new HttpParams();
      for (const k in params) {
        reqOpts.params = reqOpts.params.set(k, params[k]);
      }
    }

    return this.http.get(this.getUrl() + endpoint, reqOpts);
  }

  post(endpoint: string, body: any, reqOpts?: any) {
    return this.http.post(this.getUrl() + endpoint, body, reqOpts);
  }

  put(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(this.getUrl() + endpoint, body, reqOpts);
  }

  delete(endpoint: string, reqOpts?: any) {
    return this.http.delete(this.getUrl() + endpoint, reqOpts);
  }

  patch(endpoint: string, body: any, reqOpts?: any) {
    return this.http.patch(this.getUrl() + endpoint, body, reqOpts);
  }
}
