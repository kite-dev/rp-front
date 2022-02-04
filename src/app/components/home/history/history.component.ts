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
  
  public dtOptions: DataTables.Settings = {
    pagingType: 'full_numbers',
    pageLength: 10,
    dom: 'Bfrtip',
    responsive: true,
    language: {
      processing: "Procesando...",
      search: "Buscar:",
      lengthMenu: "Mostrar _MENU_ &eacute;l&eacute;ments",
      info: "Mostrando desde _START_ al _END_ de _TOTAL_ elementos",
      infoEmpty: "Mostrando ningún elemento.",
      infoFiltered: "(filtrado _MAX_ elementos total)",
      infoPostFix: "",
      loadingRecords: "Cargando registros...",
      // emptyTable: "No hay datos disponibles en la tabla",
      paginate: {
        first: "Primero",
        previous: "Anterior",
        next: "Siguiente",
        last: "Último"
      },
      aria: {
        sortAscending: ": Activar para ordenar la tabla en orden ascendente",
        sortDescending: ": Activar para ordenar la tabla en orden descendente"
      }
    }
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
