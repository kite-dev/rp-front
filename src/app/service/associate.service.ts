import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AssociateService {
  http: any;
  public url = "https://rpmongo.herokuapp.com/associate";
  constructor(http: HttpClient) {
    this.http = http;
  }

  registerAssociate(form: any) {
    this.url = "http://127.0.0.1:3000/associate";
    const url = `${this.url} `;
    return this.http.post(url, form , { headers: '', responseType: 'json' });
  }
  getAssociate(email: String) {
    this.url = "http://127.0.0.1:3000/associate";
    const url = `${this.url} `;
    return this.http.get(email);
  }
}
