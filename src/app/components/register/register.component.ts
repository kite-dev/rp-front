import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { AlertService } from '../alert/alert.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.css']
})
export class RegisterComponent implements OnInit {
  public registerForm: any;
  public isLoading: boolean = false;
  options = {
    autoClose: false,
    keepAfterRouteChange: false
  };
  password1: any;
  password2: any;
  public errors: any = [];
  constructor( private _form: FormBuilder,
                private _userService: UserService,
                private _router: Router,
                private alertService: AlertService) {


  }

  ngOnInit(): void {
    this.initForm();
  }
  initForm(){
    this.registerForm = this._form.group({
      email: ['', [Validators.required, Validators.email]],
      password1: [undefined, [Validators.required]],
      password2: [undefined, [Validators.required]],
    })
  }
  submitForm(){
    this.isLoading = true;
    this._userService.getUser(this.registerForm.value.email).subscribe(
      (data: any) => {
        if(data.length > 0){
          this.alertService.error('El usuario ya existe', this.options);
          this.isLoading = false;
          throw new Error("USER_EXISTS");
         
        }else{
          this._userService.registerUser(this.registerForm.value).subscribe(
            (data: any) => {
              if(data.message==='CREATED'){
                this.options.keepAfterRouteChange = true;
                this.alertService.success('Usuario creado correctamente, por favor inicie sesión', this.options);
                this._router.navigate(['login']);
              }
              this.isLoading = false;
            },
            (error: any) => {
              console.log(error);
            });
        }
        
    });
  }
      
    

}
