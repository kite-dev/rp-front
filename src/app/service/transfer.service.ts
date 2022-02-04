import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransferService {
  http: any;
  public url = "https://rpmongo.herokuapp.com/transfer";
  constructor(http: HttpClient) {
    this.http = http;
  }

  addTransfer(form: any) {
    // this.url = "http://127.0.0.1:3000/transfer";
    const url = `${this.url} `;
    return this.http.post(url, form , { headers: '', responseType: 'json' });
  }
  getTransfers(email: String){
     this.url = "http://127.0.0.1:3000/transfer";
      const url = `${this.url}/${email} `;
      return this.http.get(url);
  }
}
