import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BankService {
  http: any;
  public url = "https://bast.dev/api/banks.php";
  constructor(http: HttpClient) {
    this.http = http;
  }

  getBanks() {
    const url = `${this.url}`;
    return this.http.get(url);
  }

}
