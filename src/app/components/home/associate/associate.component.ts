import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { BankService } from 'src/app/service/bank.service';
import { AssociateService } from 'src/app/service/associate.service';
import { AlertService } from '../../alert/alert.service';
@Component({
  selector: 'app-associate',
  templateUrl: './associate.component.html',
  styleUrls: ['./associate.component.css']
})
export class AssociateComponent implements OnInit {
  public associateForm: any;
  public errors: any = [];
  public banks: any = [];
  public types = [{
    id: 1,
    name: 'Vista',
    },
    {
      id: 2,
      name: 'Corriente',
    },
    {
      id: 3,
      name: 'Ahorro',
    },
    {
      id: 4,
      name: 'Rut',
    }
  ];
  options = {
    autoClose: false,
    keepAfterRouteChange: false
  };
  constructor(private _form: FormBuilder,
              private _bankService: BankService,
              private _associateService: AssociateService,
              private alertService: AlertService) { }

  ngOnInit(): void {
    this.getBanks();
    this.initForm();
  }
  initForm(){
    this.associateForm = this._form.group({
      name: ['', [Validators.required]],
      rut: ['', [Validators.required]],
      email:['', [Validators.required, Validators.email]],
      cellphone: ['', [Validators.required]],
      bank: ['', [Validators.required]],
      type: ['', [Validators.required]],
      number: ['', [Validators.required]],
    })
  }
  getBanks(){
    this._bankService.getBanks()
    .subscribe(
      (data: any) => {
        this.banks = data.banks;
      },
      (error: any) => {
        this.alertService.error('Error al obtener bancos', this.options);
      }
    )
  }
  submitForm(){
   
    const data = this.parseForm();
    this._associateService.registerAssociate(data)
    .subscribe(
      (data: any) => {
        if(data.message === 'CREATED') {
          this.alertService.success('Nuevo destinatario guardado con exito', this.options);
          this.associateForm.reset();
        } else {
          this.alertService.error('Error al crear destinatario', this.options);
        }
      },
      (error: any) => {
        this.alertService.error('Error al crear destinatario', this.options);
      }
    );
  }
  parseForm(){
    const bank = this.banks.find((bank: any) => bank.id === this.associateForm.value.bank);
    const type = this.types.find((type: any) => {
      return +type.id === +this.associateForm.value.type
    });
    if(!type){
      this.errors.push("TYPE_NOT_FOUND");

      throw new Error("TYPE_NOT_FOUND");
    }
    const user = localStorage.getItem('user');
    const data = {
      owner: (user) ? JSON.parse(user): '',
      name: this.associateForm.value.name,
      rut: this.associateForm.value.rut,
      email: this.associateForm.value.email,
      cellphone: this.associateForm.value.cellphone,
      bank_id: this.associateForm.value.bank,
      bank_name: bank.name,
      type: this.associateForm.value.type,
      type_name: type.name,
      number: this.associateForm.value.number,
    }
    return data;
  }

}
