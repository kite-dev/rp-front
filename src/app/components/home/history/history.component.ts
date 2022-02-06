import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { TransferService } from 'src/app/service/transfer.service';
import { AlertService } from '../../alert/alert.service';
import {  formatNumber  } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';

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
  public searchText = '';
  public filteredData: any = [];
  public data: any = [];
  public currentUserEmail = '';
  public currentIndex = 0;
  public paginatedData: any = [];
  public pageArray: any= [];
  constructor(private _transferService:TransferService,
              private alertService: AlertService) { }
  
  ngOnInit(): void {
    const currentUserEmail = localStorage.getItem('user') ? localStorage.getItem('user') : null;
    if(currentUserEmail){
      this.currentUserEmail = JSON.parse(currentUserEmail);
    }
    this.searchData();
    registerLocaleData( es );
    
  }
  searchData(){
    this._transferService.getTransfers(this.currentUserEmail)
    .subscribe(
      (data: any) => {
        this.data = data.reverse();
        this.filteredData = this.data;
        this.reOrderData();
      },
      (error: any) => {
        this.alertService.error("Error al obtener los datos", this.options);
      })
    
  }
  filterData(event:any){
    this.searchText = event.target.value;
    this.filteredData = this.data.filter((item: any) => {
      return item.name.toLowerCase().includes(this.searchText.toLowerCase())
      || item.rut.toLowerCase().includes(this.searchText.toLowerCase())
      || item.bank_name.toLowerCase().includes(this.searchText.toLowerCase())
      || item.type_name.toLowerCase().includes(this.searchText.toLowerCase())
      || item.amount.toLowerCase().includes(this.searchText.toLowerCase())
    })
    this.reOrderData();
  }
  showPrevious(){
    if(this.currentIndex > 0){
      this.currentIndex--;
    }

  }
  showNext(){
    if(this.currentIndex < this.paginatedData.length - 1){
      this.currentIndex++;
    }

  }
  reOrderData(){
    const data: any = [];
    let tempIndex = 0;
    let internalCounter = 0;

    this.filteredData.forEach((item: any) => {
      if(!data[tempIndex]){
        data.push([]);
      }
      data[tempIndex].push(item);
      internalCounter++;
      if(internalCounter === 5){
        tempIndex++;
        internalCounter = 0;
        
      }
    })
    this.paginatedData = data;
    this.setPaging();
  }
  setPaging(){
    const last = this.paginatedData.length;
    for(let i = last; i > 0 ; i--){
      this.pageArray.push(i);
    }
  }
  
  showPage(page: any){
    this.currentIndex = page - 1;
  }
  

}
