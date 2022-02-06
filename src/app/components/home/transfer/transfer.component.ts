import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AssociateService } from 'src/app/service/associate.service';
import { TransferService } from 'src/app/service/transfer.service';
import { AlertService } from '../../alert/alert.service';
@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {
  options = {
    autoClose: false,
    keepAfterRouteChange: false
  };
  public transferForm: any;
  public associates:any = [];
  public associate: any;
  public currentUser: any;
  public showSelectedDetail = false;
  public currentUserEmail: any = '';
  public selectedAssociate = {
    name: '',
    rut: '',
    email: '',
    cellphone: '',
    bank: '',
    type: '',
    number: '',
    bank_name:'',
    type_name:''
  };

  constructor(private _form: FormBuilder,
              private _associateService: AssociateService,
              private _transferService: TransferService,
              private alertService: AlertService) { 
    const localUser = localStorage.getItem('user');
    const user = localUser !== null ?  JSON.parse(localUser) : '';
    this.currentUser = user ? user : null;
               }

  ngOnInit(): void {
    this.initForm();
    this.getAssociates();
    this.currentUser = localStorage.getItem('user') ?  localStorage.getItem('user')  : null;
    if(this.currentUser){
      this.currentUserEmail = JSON.parse(this.currentUser);
    }
  }
  initForm(){
    this.transferForm = this._form.group({
      destiny: ['Seleccione Destinatario', [Validators.required]],
      amount: [0, [Validators.required,  Validators.min(1)]],
    })
  }

  submitForm(){
    const toSubmit = this.parseForm();
    this._transferService.addTransfer(toSubmit)
    .subscribe(
      (data: any) => {
        if(data.message === 'CREATED') {
          this.alertService.success('Transferencia realizada con exito', this.options);
          this.transferForm.reset();
          this.showSelectedDetail = false;
        } else {
          this.alertService.error('Error al realizar la transferencia', this.options);
        }
      },
      (error: any) => {
        console.log(error);
        this.alertService.error('Error al realizar la transferencia', this.options);
      }
    )
  }
  parseForm(){
    const data = {
      amount: this.transferForm.value.amount,
      rut: this.selectedAssociate.rut,
      name: this.selectedAssociate.name,
      email: this.selectedAssociate.email,
      bank_name: this.selectedAssociate.bank_name,
      type_name: this.selectedAssociate.type_name,
      number: this.selectedAssociate.number,
      owner: this.currentUserEmail

    }
    return data;
  }
  getAssociates(){
    this._associateService.getAssociate(this.currentUser).subscribe(
      (data: any) => {
        this.associates = data;
      },
      (error: any) => {
        console.log('ERROR')
        this.alertService.error('Error al obtener los asociados', this.options);
      }
    );
  }
  changeSelected(){
    this.showSelectedDetail = true;
    this.selectedAssociate = this.associates.find((associate: any) => associate.rut === this.transferForm.value.destiny);
    if(!this.selectedAssociate){
      this.alertService.error('No se encontro el asociado', this.options);
      this.showSelectedDetail = false;
    }
  }


}
