import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { UserService } from '../../service/user.service';
import { Router} from '@angular/router';
import { AlertService } from '../alert/alert.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: any;
  public errors: any = [];
  options = {
    autoClose: false,
    keepAfterRouteChange: false
  };
  constructor( private _form: FormBuilder,
    private _userService: UserService,
    private _router: Router,
    private alertService: AlertService) {

  }

  ngOnInit(): void {
    this.initForm();
    this.removeLoggedUser();
    this.checkCreatedUser();
    
  }

  initForm(){
    this.loginForm = this._form.group({
      email: ['', [Validators.required, Validators.email]],
      password: [undefined, [Validators.required]],
    })
  }
  removeLoggedUser(){
    if(localStorage.getItem('user')){
      localStorage.removeItem('user');
    }
  }
  checkCreatedUser(){
    if(localStorage.getItem('registered') === '1'){
      this.errors.push('Usuario creado correctamente, por favor inicie sesión');
      localStorage.removeItem('registered');
    }
  }
  submitForm(){
    this.alertService.clear();
    this._userService.login(this.loginForm.value).subscribe(
      (data: any) => {
        if(data.message==='USER_FOUNDNT'){
          this.errors.push("USER_FOUNDNT");
          this.alertService.error('Usuario no encontrado', this.options);
          throw new Error("USER_FOUNDNT");
        }else{
          localStorage.setItem('user', JSON.stringify(this.loginForm.value.email));
          this.alertService.success('Autentificado correctamente, redireccionando!', this.options)
          setTimeout(() => {
            this._router.navigate(['home']);
          }, 3000);
         
          return false;
        }
    },
    (error: any) => {
      console.log(error)
    });
  }


}
