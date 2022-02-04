import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { TransferService } from 'src/app/service/transfer.service';
import { AlertService } from '../../alert/alert.service';
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {  
  options = {
    autoClose: false,
    keepAfterRouteChange: false
  };
  
  
  public data: any = [];
  public currentUserEmail = '';
  constructor(private _transferService:TransferService,
              private alertService: AlertService) { }
  
  ngOnInit(): void {
    const currentUserEmail = localStorage.getItem('user') ? localStorage.getItem('user') : null;
    if(currentUserEmail){
      this.currentUserEmail = JSON.parse(currentUserEmail);
    }
    this.searchData();
  }
  searchData(){
    this._transferService.getTransfers(this.currentUserEmail)
    .subscribe(
      (data: any) => {
        this.data = data;
      },
      (error: any) => {
        this.alertService.error("Error al obtener los datos", this.options);
      })
    
  }
  

}
